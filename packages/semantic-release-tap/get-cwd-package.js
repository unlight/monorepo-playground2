const path = require('path');
const readPackage = require('read-package-json-fast');
const { createError } = require('./create-error.js');

exports.getCwdPackage = async function getCwdPackage({ cwd }) {
  const cwdPackagePath = path.join(cwd, 'package.json');
  const result = await readPackage(cwdPackagePath).catch(error => {
    throw new createError('EREADPACKAGE', {
      path: cwdPackagePath,
      details: error.message,
    });
  });

  return result;
};
