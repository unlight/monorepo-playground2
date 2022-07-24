const AggregateError = require('aggregate-error');
const { createError } = require('./create-error.js');

exports.verifyConfig = async function verifyConfig({ plugins, pluginConfig }) {
  const errors = [];
  const normalizedPlugins = plugins.map(toPlugin);
  const npmIndex = normalizedPlugins.findIndex(
    plugin => plugin?.[0] === '@semantic-release/npm',
  );
  const gitIndex = normalizedPlugins.findIndex(
    plugin => plugin?.[0] === '@semantic-release/git',
  );
  const pluginIndex = normalizedPlugins.findIndex(
    plugin => plugin?.[0] === 'semantic-release-tap',
  );

  if (npmIndex === -1) {
    errors.push(createError('ENOPLUGIN', { path: '@semantic-release/npm' }));
  }

  if (gitIndex === -1) {
    errors.push(createError('ENOPLUGIN', { path: '@semantic-release/git' }));
  }

  if (!(pluginIndex > npmIndex && pluginIndex > gitIndex)) {
    errors.push(createError('EPLUGINPLACE', { path: 'semantic-release-tap' }));
  }

  if (
    typeof pluginConfig.prefix !== 'undefined' &&
    !(
      typeof pluginConfig.prefix === 'string' &&
      ['^', '~', ''].includes(pluginConfig.prefix)
    )
  ) {
    errors.push(
      createError('EINVALIDCONFIG', {
        name: 'prefix',
        value: pluginConfig.prefix,
      }),
    );
  }

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }
};

function toPlugin(plugin) {
  if (Array.isArray(plugin)) return plugin;
  if (typeof plugin === 'string') {
    return [plugin];
  }

  return plugin;
}
