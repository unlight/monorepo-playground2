import path from 'node:path';

const parserFile = path.normalize('/node_modules/git-log-parser/src/index.js');

// eslint-disable-next-line unicorn/prefer-module
for (const moduleName of Object.keys(require.cache).filter(m =>
  path.normalize(m).endsWith(parserFile),
)) {
  const parse = require.cache[moduleName].exports.parse;

  require.cache[moduleName].exports.parse = (
    config: { _?: string | string[] },
    options: { cwd: string },
  ) => {
    if (Array.isArray(config._)) config._.push(options.cwd);
    else if (config._) config._ = [config._, options.cwd];
    else config._ = options.cwd;
    return parse(config, options);
  };
}

const { name } = require(path.resolve('package.json'));

export const tagFormat = `${name}-v\${version}`;
