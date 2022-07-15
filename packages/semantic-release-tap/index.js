const path = require('path');
const mapWorkspaces = require('@npmcli/map-workspaces');
const readPackage = require('read-package-json-fast');
const AggregateError = require('aggregate-error');
const SemanticReleaseError = require('@semantic-release/error');
const semverMaxSatisfying = require('semver/ranges/max-satisfying');
const { gitRoot } = require('@antongolub/git-root');

const contextSymbol = (exports.contextSymbol = Symbol('PluginContext'));

/**
 * @typedef {import('./types').Context} Context
 * @typedef {import('./types').Config} Config
 */

/**
 * @param {Config} pluginConfig
 * @param {Context} context
 */
exports.verifyConditions = async function verifyConditions(pluginConfig, context) {
  const errors = [];
  const { cwd, options } = context;
  const root = await gitRoot(cwd).catch(() => '');

  if (!root) {
    errors.push(createError('ENOGITROOT', context));
    maybeThrowErrors(errors);
  }

  const rootPackagePath = path.join(root, 'package.json');
  const rootPackage = await readPackage(rootPackagePath).catch(() => {
    errors.push(createError('EREADPACKAGE', { path: rootPackagePath }));
    maybeThrowErrors(errors);
  });

  const workspaces = await mapWorkspaces({
    cwd: root,
    pkg: {
      workspaces: rootPackage.workspaces,
    },
  });

  // @semantic-release/npm option pkgRoot
  const cwdDirectoryPublish =
    options.plugins.find(p => p?.[0] === '@semantic-release/npm')?.at(1)?.pkgRoot ||
    '.';
  const cwdDirectoryPublishPackagePath = path.join(
    cwd,
    cwdDirectoryPublish,
    'package.json',
  );

  const cwdDirectoryPublishPackage = await readPackage(
    cwdDirectoryPublishPackagePath,
  ).catch(() => {
    errors.push(createError('EREADPACKAGE', { path: cwdDirectoryPublishPackagePath }));
    maybeThrowErrors(errors);
  });

  pluginContext(context, {
    root,
    workspaces,
    rootPackage,
    cwdDirectoryPublishPackage,
  });
};

exports.analyzeCommits = async function analyzeCommits(pluginConfig, context) {
  if (process.env.NODE_ENV === 'test') {
    context.stdout.emit(contextSymbol, pluginContext(context));
  }
};

/**
 * @param {Config} pluginConfig
 * @param {Context} context
 */
exports.prepare = async function prepare(pluginConfig, context) {
  // console.log('context', context);
  const { cwdDistPackage, workspaces } = pluginContext(context);
  for (const [packageName, version] of Object.entries(cwdDistPackage.dependencies)) {
    const workspace = workspaces.get(packageName);
    // Find dist again?
  }
};

exports.pluginContext = pluginContext;

function pluginContext(context, values) {
  context.stdout[contextSymbol] ??= {};

  if (arguments.length > 1) {
    Object.assign(context.stdout[contextSymbol], values);
  }

  return context.stdout[contextSymbol];
}

function maybeThrowErrors(errors) {
  if (errors.length > 0) {
    throw new AggregateError(errors);
  }
}

function createError(code, context) {
  let message = 'Unknown error';
  let details;
  switch (code) {
    case 'ENOGITROOT':
      {
        message = `Falied to find git root from ${JSON.stringify(context.cwd)}`;
      }
      break;
    case 'EREADPACKAGE':
      {
        message = `Falied to read ${JSON.stringify(context.path)}`;
      }
      break;
  }

  return new SemanticReleaseError(message, code, details);
}

// exports.verifyRelease = async function verifyRelease(pluginConfig, context) {
//   debugger;
// };

// exports.generateNotes = async function generateNotes(pluginConfig, context) {
//   debugger;
// };

// exports.publish = async function publish(pluginConfig, context) {
//   debugger;
// };

// exports.success = async function success(pluginConfig, context) {
//   debugger;
// };

// exports.fail = async function fail(pluginConfig, context) {
//   debugger;
// };
