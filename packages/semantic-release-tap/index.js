const { writeFile } = require('fs/promises');
const { getGitRoot } = require('./get-git-root.js');
const { getMapWorkspaces } = require('./get-map-workspaces.js');
const { getCwdDistPackage } = require('./get-cwd-dist-package.js');
const { getCwdPackage } = require('./get-cwd-package.js');
const { verifyConfig } = require('./verify-config.js');
const { getSatisfyingVersion } = require('./get-satisfying-version.js');

/**
 * @typedef {import('./types').Context} Context
 * @typedef {import('./types').Config} Config
 */

/**
 * @param {Config} pluginConfig
 * @param {Context} context
 */
exports.verifyConditions = async function verifyConditions(pluginConfig, context) {
  const {
    cwd,
    options: { plugins },
    logger,
  } = context;

  await verifyConfig({ plugins, pluginConfig });
  await getCwdDistPackage({ cwd, plugins });

  const root = await getGitRoot(cwd);
  const workspaces = await getMapWorkspaces({ root, cwd });
  const cwdPackage = await getCwdPackage({ cwd });

  for (const [packageName, version] of Object.entries(cwdPackage.dependencies)) {
    const dependencyWorkspaceFolder = workspaces.get(packageName);
    if (!dependencyWorkspaceFolder) {
      continue;
    }
    logger.log('Found workspace dependency %s', `${packageName}@${version}`);
  }
};

// exports.analyzeCommits = async function analyzeCommits(pluginConfig, context) {
//   // TODO: Remove test
//   // d(context);
//   return 'patch';
// };

/**
 * @param {Config} pluginConfig
 * @param {Context} context
 */
exports.prepare = async function prepare(pluginConfig, context) {
  const {
    cwd,
    options: { plugins },
  } = context;
  const prefix = pluginConfig?.prefix ?? '';
  const workspaces = await getMapWorkspaces({ cwd });
  const cwdDistPackage = await getCwdDistPackage({ cwd, plugins });

  for (const [packageName, version] of Object.entries(cwdDistPackage.dependencies)) {
    const dependencyWorkspaceFolder = workspaces.get(packageName);

    if (!dependencyWorkspaceFolder) {
      continue;
    }

    const dependencyVersion = await getSatisfyingVersion({
      name: packageName,
      range: version,
    });
    cwdDistPackage.dependencies[packageName] = `${
      prefix ? prefix : ''
    }${dependencyVersion}`;
  }

  await writeFile(cwdDistPackage._path, JSON.stringify(cwdDistPackage, null, 2));
};

// exports.verifyRelease = async function verifyRelease(pluginConfig, context) {}
// exports.generateNotes = async function generateNotes(pluginConfig, context) { };
// exports.publish = async function publish(pluginConfig, context) { };
// exports.success = async function success(pluginConfig, context) { };
// exports.fail = async function fail(pluginConfig, context) { };

// function d(context) {
//   console.dir(
//     {
//       commits: context.commits,
//       branch: context.branch,
//       branches: context.branches,
//       cwd: context.cwd,
//       // env: context.env,
//       envCi: context.envCi,
//       options: context.options,
//     },
//     { depth: 4 },
//   );
// }
