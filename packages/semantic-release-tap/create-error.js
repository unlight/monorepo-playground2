const SemanticReleaseError = require('@semantic-release/error');

exports.createError = function createError(code, context) {
  let message = 'Unknown error';
  const { details, cwd, path, name, value } = context;
  switch (code) {
    case 'ENOGITROOT':
      message = `Falied to find git root from ${JSON.stringify(cwd)}`;
      break;
    case 'EREADPACKAGE':
      message = `Falied to read ${JSON.stringify(path)}`;
      break;
    case 'ENOPLUGIN':
      message = `Missing plugin ${JSON.stringify(path)}`;
      break;
    case 'EPLUGINPLACE':
      message = `Plugin ${JSON.stringify(path)} should be placed after npm and git`;
      break;
    case 'EINVALIDCONFIG':
      message = `Invalid value for ${JSON.stringify(name)} (${JSON.stringify(value)})`;
      break;
  }

  return new SemanticReleaseError(message, code, details);
};
