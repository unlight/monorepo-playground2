// const path = require('path');
// const mapWorkspaces = require('@npmcli/map-workspaces');
// const readPackage = require('read-package-json-fast');
// const AggregateError = require('aggregate-error');
// const semverMaxSatisfying = require('semver/ranges/max-satisfying');
const { getGitRoot } = require('./get-git-root.js');
const { getMapWorkspaces } = require('./get-map-workspaces.js');
const { getCwdDistPackage } = require('./get-cwd-dist-package.js');

/**
 * @typedef {import('./types').Context} Context
 * @typedef {import('./types').Config} Config
 */

/**
 * @param {Config} pluginConfig
 * @param {Context} context
 */
exports.verifyConditions = async function verifyConditions(pluginConfig, context) {
  const { cwd, options } = context;
  const root = await getGitRoot(cwd);
  await getMapWorkspaces({ root });
  await getCwdDistPackage({ cwd, plugins: options.plugins });
};

/**
 * @param {Config} pluginConfig
 * @param {Context} context
 */
// exports.prepare = async function prepare(pluginConfig, context) {
//   // console.log('context', context);
//   const { cwdDistPackage, workspaces } = pluginContext(context);
//   for (const [packageName, version] of Object.entries(cwdDistPackage.dependencies)) {
//     const workspace = workspaces.get(packageName);
//     // Find dist again?
//   }
// };

// exports.pluginContext = pluginContext;

// function pluginContext(context, values) {
//   context.stdout[contextSymbol] ??= {};

//   if (arguments.length > 1) {
//     Object.assign(context.stdout[contextSymbol], values);
//   }

//   return context.stdout[contextSymbol];
// }

// exports.verifyRelease = async function verifyRelease(pluginConfig, context) {}
// exports.generateNotes = async function generateNotes(pluginConfig, context) { };
// exports.publish = async function publish(pluginConfig, context) { };
// exports.success = async function success(pluginConfig, context) { };
// exports.fail = async function fail(pluginConfig, context) { };
