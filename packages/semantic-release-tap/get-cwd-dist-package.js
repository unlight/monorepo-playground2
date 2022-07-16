const path = require('path');
const readPackage = require('read-package-json-fast');
const { createError } = require('./create-error.js');

exports.getCwdDistPackage = async function getCwdDistPackage({ cwd, plugins }) {
  // Find @semantic-release/npm option pkgRoot
  const cwdPkgRoot =
    plugins.find(p => p?.[0] === '@semantic-release/npm')?.at(1)?.pkgRoot || '.';
  const cwdDistPackagePath = path.join(cwd, cwdPkgRoot, 'package.json');
  const result = await readPackage(cwdDistPackagePath).catch(error => {
    throw new createError('EREADPACKAGE', {
      path: cwdDistPackagePath,
      details: error.message,
    });
  });

  return result;
};
