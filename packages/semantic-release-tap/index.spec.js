const path = require('path');
const assert = require('assert/strict');
const semanticRelease = require('semantic-release');
const { createContext } = require('./context.fixture.js');

const plugin = require('./index.js');

it('smoke', async () => {
  assert.ok(plugin);
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
    plugins: [
      '@semantic-release/git',
      ['@semantic-release/npm', { pkgRoot: './dist' }],
      plugin,
    ],
    repositoryUrl: '.',
  });
});

it('no ci', async () => {
  await semanticRelease({
    dryRun: false,
    noCi: true,
    branches: ['master'],
    plugins: [
      '@semantic-release/git',
      ['@semantic-release/npm', { pkgRoot: './dist' }],
      plugin,
    ],
    repositoryUrl: '.',
  });
});

it('semver playground', () => {
  const semverMaxSatisfying = require('semver/ranges/max-satisfying');
  console.log('semverMaxSatisfying', semverMaxSatisfying(['1.2.3', '2.0.0'], '*'));
});
