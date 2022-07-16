const { execSync } = require('child_process');
const findVersions = require('find-versions');
const semverMaxSatisfying = require('semver/ranges/max-satisfying');

exports.getSatisfyingTagVersion = function getSatisfyingTagVersion({ name, range }) {
	let command = `git rev-list --max-count=-1 --tags="${name}-v[0-9]*\\.[0-9]*\\.*"`;
	const commits = execSync(command, { encoding: 'utf8' });
	const pointsAt = commits
		.trim()
		.split('\n')
		.map(commit => `--points-at ${commit}`)
		.join(' ');
	command = `git tag ${pointsAt}`;
	const tagsOutput = execSync(command, { encoding: 'utf8' });
	const tagList = tagsOutput
		.trim()
		.split('\n')
		.filter(tag => tag.startsWith(name))
		.join(' ');
	const versions = findVersions(tagList, { loose: true });
	const result = semverMaxSatisfying(versions, range);

	return result;
};
