// const path = require('path');
// const mapWorkspaces = require('@npmcli/map-workspaces');
// const readPackage = require('read-package-json-fast');
// const AggregateError = require('aggregate-error');
// const semverMaxSatisfying = require('semver/ranges/max-satisfying');
const { getGitRoot } = require('./get-git-root.js');
const { getMapWorkspaces } = require('./get-map-workspaces.js');
const { getCwdDistPackage } = require('./get-cwd-dist-package.js');
const { getCwdPackage } = require('./get-cwd-package.js');

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
  await getMapWorkspaces({ root, cwd });
  await getCwdPackage({ cwd });
  await getCwdDistPackage({ cwd, plugins: options.plugins });
};

/**
 * @param {Config} pluginConfig
 * @param {Context} context
 */
exports.prepare = async function prepare(pluginConfig, context) {
  const { cwd, options } = context;
  const workspaces = await getMapWorkspaces({ cwd });
  const cwdPackage = await getCwdPackage({ cwd });

  for (const [packageName, version] of Object.entries(cwdPackage.dependencies)) {
    const dependencyWorkspaceFolder = workspaces.get(packageName);
    if (!dependencyWorkspaceFolder) {
      continue;
    }
    // const dependencyPackage = await getCwdPackage({ cwd: dependencyFolder });
    const dependencyDistPackage = await getCwdDistPackage({
      cwd: dependencyWorkspaceFolder,
      plugins: options.plugins,
    });
    console.log('dependencyDistPackage', dependencyDistPackage);
    console.log('version', version);
    d(context);
    // console.log('cwdDistPackage', cwdDistPackage);
    // console.log('cwdDistPackage', cwdDistPackage);
    // const x = await dependencyFolder()

    // console.log('dependencyFolder', dependencyFolder);

    // console.log('dependencySource', dependencySource);
    // console.log('workspace', workspace);
    // Find dist again?
  }
};

// exports.analyzeCommits = async function analyzeCommits(pluginConfig, context) {
//   d(context);
// };
// exports.verifyRelease = async function verifyRelease(pluginConfig, context) {}
// exports.generateNotes = async function generateNotes(pluginConfig, context) { };
// exports.publish = async function publish(pluginConfig, context) { };
// exports.success = async function success(pluginConfig, context) { };
// exports.fail = async function fail(pluginConfig, context) { };

function d(context) {
  console.dir(
    {
      commits: context.commits,
      branch: context.branch,
      branches: context.branches,
      cwd: context.cwd,
      // env: context.env,
      envCi: context.envCi,
      options: context.options,
    },
    { depth: 4 },
  );
}
