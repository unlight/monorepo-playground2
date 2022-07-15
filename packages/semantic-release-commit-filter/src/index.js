"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagFormat = void 0;
const node_path_1 = __importDefault(require("node:path"));
const parserFile = node_path_1.default.normalize('/node_modules/git-log-parser/src/index.js');
// eslint-disable-next-line unicorn/prefer-module
for (const moduleName of Object.keys(require.cache).filter(m => node_path_1.default.normalize(m).endsWith(parserFile))) {
    const parse = require.cache[moduleName].exports.parse;
    require.cache[moduleName].exports.parse = (config, options) => {
        if (Array.isArray(config._))
            config._.push(options.cwd);
        else if (config._)
            config._ = [config._, options.cwd];
        else
            config._ = options.cwd;
        return parse(config, options);
    };
}
const { name } = require(node_path_1.default.resolve('package.json'));
exports.tagFormat = `${name}-v\${version}`;
//# sourceMappingURL=index.js.map