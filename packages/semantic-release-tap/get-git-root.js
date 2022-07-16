const { gitRoot } = require('@antongolub/git-root');
const { createError } = require('./create-error.js');

exports.getGitRoot = async function getGitRoot(cwd) {
	const result = await gitRoot(cwd).catch(error => {
		throw new createError('ENOGITROOT', { cwd, details: error.message });
	});

	return result;
};
