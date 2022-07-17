const SemanticReleaseError = require('@semantic-release/error');

exports.createError = function createError(code, context) {
  let message = 'Unknown error';
  const { details, cwd, path } = context;
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
  }

  return new SemanticReleaseError(message, code, details);
};
