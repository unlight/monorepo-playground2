const AggregateError = require('aggregate-error');
const { createError } = require('./create-error.js');

exports.verifyConfig = async function verifyConfig({ plugins }) {
  const errors = [];
  const npm = plugins
    .map(toPlugin)
    .find(plugin => plugin?.[0] === '@semantic-release/npm');

  if (!npm) {
    errors.push(createError('ENOPLUGIN', { path: '@semantic-release/npm' }));
  }

  const git = plugins
    .map(toPlugin)
    .find(plugin => plugin?.[0] === '@semantic-release/git');

  if (!git) {
    errors.push(createError('ENOPLUGIN', { path: '@semantic-release/git' }));
  }

  // TODO: verify conditions put plugin (after semantic-release/git and after npm)
  // TODO: verify conditions npm publish do not use tarball

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }
};

function toPlugin(p) {
  if (Array.isArray(p)) return p;
  if (typeof p === 'string') {
    return [p];
  }

  return p;
}
