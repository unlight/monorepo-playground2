const path = require('path');
const readPackage = require('read-package-json-fast');
const mapWorkspaces = require('@npmcli/map-workspaces');
const { createError } = require('./create-error.js');
const { getGitRoot } = require('./get-git-root.js');

exports.getMapWorkspaces = async function getMapWorkspaces({ root, cwd }) {
  if (!root) {
    root = await getGitRoot(cwd);
  }

  const rootPackagePath = path.join(root, 'package.json');
  const rootPackage = await readPackage(rootPackagePath).catch(error => {
    throw new createError('EREADPACKAGE', {
      path: rootPackagePath,
      details: error.message,
    });
  });

  const result = await mapWorkspaces({
    cwd: root,
    pkg: {
      workspaces: rootPackage.workspaces,
    },
  });

  return result;
};
