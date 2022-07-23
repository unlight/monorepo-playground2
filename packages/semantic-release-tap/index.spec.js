const path = require('path');
const assert = require('assert/strict');
const semanticRelease = require('semantic-release');
const { createContext } = require('./context.fixture.js');

const plugin = require('./index.js');

it('smoke', async () => {
  assert.ok(plugin);
});

describe('verifyConditions', () => {
  it('verifyConditions plugin', async () => {
    const context = createContext({ cwd: __dirname });
    await plugin.verifyConditions({}, context);
  });

  it('plugin should be after npm and git', async () => {
    const context = createContext({
      options: {
        plugins: [
          '@semantic-release/npm',
          'semantic-release-tap',
          '@semantic-release/git',
        ],
      },
    });

    await assert.rejects(
      plugin.verifyConditions({}, context),
      'should be placed after npm and git',
    );
  });

  it('verify prefix configuration', async () => {
    const context = createContext({});

    await assert.rejects(async () => {
      return await plugin.verifyConditions({ prefix: '!' }, context);
    }, 'Invalid value');
  });

  [{ prefix: '' }, { prefix: '~' }, { prefix: '^' }, { prefix: undefined }].forEach(
    ({ prefix }) => {
      it(`verify prefix configuration ${prefix}`, async () => {
        const context = createContext({});
        return await plugin.verifyConditions({ prefix }, context);
      });
    },
  );
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
