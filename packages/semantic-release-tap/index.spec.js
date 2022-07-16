const assert = require('assert/strict');
const semanticRelease = require('semantic-release');
const { gitRoot } = require('@antongolub/git-root');
const { createContext } = require('./context.fixture.js');

const plugin = require('./index.js');

it.only('verifyConditions', async () => {
  const context = createContext({ cwd: __dirname });
  await plugin.verifyConditions({}, context);
});

it.skip('prepare', async () => {
  const root = gitRoot.sync();

  const context = createContext();
  plugin.pluginContext(context, {
    cwdDistPackage: {
      dependencies: {
        '@acme/foo': '*',
      },
    },
    workspaces: new Map([
      ['@acme/bar', root + '/packages/bar'],
      ['@acme/foo', root + '/packages/foo'],
    ]),
  });

  await plugin.prepare({}, context);
});

it.skip('dry run', async () => {
  let pluginContext;
  process.stdout.on(plugin.contextSymbol, data => {
    pluginContext = data;
  });

  await semanticRelease({
    dryRun: true,
    noCi: true,
    branches: ['master'],
    plugins: [plugin],
    repositoryUrl: '.',
  });

  assert.ok(pluginContext);
  assert.ok(pluginContext.root);
  assert.ok(pluginContext.workspaces);
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

it.skip('smoke', () => {
  assert.ok(plugin);
});

it.skip('semver playground', () => {
  const semverMaxSatisfying = require('semver/ranges/max-satisfying');
  console.log('semverMaxSatisfying', semverMaxSatisfying(['1.2.3', '2.0.0'], '*'));
});
