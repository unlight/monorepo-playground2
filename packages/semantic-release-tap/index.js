const { getGitRoot } = require('./get-git-root.js');
const { getMapWorkspaces } = require('./get-map-workspaces.js');
const { getCwdDistPackage } = require('./get-cwd-dist-package.js');
const { getCwdPackage } = require('./get-cwd-package.js');
const { getSatisfyingTagVersion } = require('./get-satisfying-tag-version.js');

/**
 * @typedef {import('./types').Context} Context
 * @typedef {import('./types').Config} Config
 */

/**
 * @param {Config} pluginConfig
 * @param {Context} context
 */
exports.verifyConditions = async function verifyConditions(pluginConfig, context) {
  const { cwd, options, logger } = context;
  const root = await getGitRoot(cwd);
  const workspaces = await getMapWorkspaces({ root, cwd });
  const cwdPackage = await getCwdPackage({ cwd });
  // TODO: Check, this may fail
  // await getCwdDistPackage({ cwd, plugins: options.plugins });

  for (const [packageName, version] of Object.entries(cwdPackage.dependencies)) {
    const dependencyWorkspaceFolder = workspaces.get(packageName);
    if (!dependencyWorkspaceFolder) {
      continue;
    }
    const satisfyingTagVersion = getSatisfyingTagVersion({
      name: packageName,
      range: version,
    });
    // Need to write here what will be next version, but we cant since we do not know commits from other package
    logger.log(
      `Dependency ${packageName} will be updated to version ${satisfyingTagVersion}`,
    );
  }
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
    const dependencyPackageName = dependencyDistPackage.name;
    // find git version
    // console.log('dependencyDistPackage', dependencyDistPackage);
    // console.log('version', version);
    // d(context);
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
