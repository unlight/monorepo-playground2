const path = require('path');
const assert = require('assert/strict');
const semanticRelease = require('semantic-release');
const { gitRoot } = require('@antongolub/git-root');
const { createContext } = require('./context.fixture.js');
const git = require('semantic-release/lib/git');
const semver = require('semver');
const findVersions = require('find-versions');

const plugin = require('./index.js');

it('smoke', async () => {
  assert.ok(plugin);

  const tags = await git.getTags('master');
  tags.forEach(t => {
    console.log('t', t);
    const f = findVersions(t, { loose: true });
    console.log('f', f);
    // const x = semver.clean(t);
    // console.log('x', x);
  });
});

it('verifyConditions plugin', async () => {
  const context = createContext({ cwd: __dirname });
  await plugin.verifyConditions({}, context);
});

it('prepare plugin', async () => {
  const context = createContext({
    cwd: path.resolve(__dirname, '../../packages/semantic-release-tap'),
    branch: {
      channel: undefined,
      tags: [
        {
          gitTag: 'semantic-release-tap-v0.2.0',
          version: '0.2.0',
        },
        {
          gitTag: 'semantic-release-tap-v0.3.0',
          version: '0.3.0',
        },
      ],
      type: 'release',
      name: 'master',
      accept: ['patch', 'minor', 'major'],
      main: true,
    },
  });
  await plugin.prepare({}, context);
});

it('dry run', async () => {
  await semanticRelease({
    dryRun: true,
    noCi: true,
    branches: ['master'],
    plugins: [plugin],
    repositoryUrl: '.',
  });
});

it.skip('integration semantic-release-tap', async () => {
  const result = await semanticRelease(
    {
      branches: ['master'],
      plugins: [
        plugin,
        [
          '@semantic-release/npm',
          {
            pkgRoot: './dist',
          },
        ],
      ],
    },
    {
      cwd: __dirname,
    },
  );
});

it.skip('integration acme bar', async () => {
  const result = await semanticRelease(
    {
      dryRun: true,
      branches: ['master'],
      plugins: [
        plugin,
        [
          '@semantic-release/npm',
          {
            pkgRoot: './dist',
          },
        ],
      ],
    },
    {
      cwd: root + '/packages/bar',
    },
  );
});

it.skip('semver playground', () => {
  const semverMaxSatisfying = require('semver/ranges/max-satisfying');
  console.log('semverMaxSatisfying', semverMaxSatisfying(['1.2.3', '2.0.0'], '*'));
});
