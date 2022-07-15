const { merge } = require('lodash');

exports.createContext = function createContext(parts) {
  return merge(
    {
      stdout: process.stdout,
    },
    baseContext,
    parts,
  );
};

const baseContext = {
  commits: [
    {
      commit: { long: 'c3509be8bb59e6b1a7284aeb06e645b739ecfe63', short: 'c3509be' },
      tree: { long: '29733f75f910a56ea5792b30825898e74b9ea3bd', short: '29733f7' },
      author: {
        name: 'Ivan',
        email: 'ivan@mail.com',
        date: '2022-07-09T15:23:28.000Z',
      },
      committer: {
        name: 'Ivan',
        email: 'ivan@mail.com',
        date: '2022-07-09T15:23:28.000Z',
      },
      subject: 'chore: Add test command',
      body: '',
      hash: 'c3509be8bb59e6b1a7284aeb06e645b739ecfe63',
      committerDate: '2022-07-09T15:23:28.000Z',
      message: 'chore: Add test command',
      gitTags: '(HEAD -> master)',
    },
  ],
  lastRelease: {
    version: '1.0.0',
    gitTag: 'semantic-release-tap-v1.0.0',
    channels: [null],
    gitHead: '4a6f439c9143cc864f493cc297f5a3c556feaf0f',
    name: 'semantic-release-tap-v1.0.0',
  },
  releases: [],
  branch: {
    tags: [
      { gitTag: '@acme/bar-v1.0.0', version: '1.0.0', channels: [null] },
      { gitTag: '@acme/bar-v1.1.0', version: '1.1.0', channels: [null] },
    ],
    type: 'release',
    name: 'master',
    range: '>=1.1.0',
    accept: ['patch', 'minor', 'major'],
    main: true,
  },
  branches: [
    {
      tags: [
        { gitTag: '@acme/bar-v1.0.0', version: '1.0.0', channels: [null] },
        { gitTag: '@acme/bar-v1.1.0', version: '1.1.0', channels: [null] },
      ],
      type: 'release',
      name: 'master',
      range: '>=1.1.0',
      accept: ['patch', 'minor', 'major'],
      main: true,
    },
  ],
  cwd: 'E:\\Dev\\monorepo-playground\\packages\\bar',
  env: {
    COLOR: '1',
  },
  envCi: {
    isCi: false,
    commit: 'a02122edde07806333fcb338a013e841c16426ea',
    branch: 'master',
  },
  options: {
    branches: [
      '+([0-9])?(.{+([0-9]),x}).x',
      'master',
      'next',
      'next-major',
      { name: 'beta', prerelease: true },
      { name: 'alpha', prerelease: true },
    ],
    repositoryUrl: 'git@github.com:unlight/monorepo-playground.git',
    tagFormat: '@acme/bar-v${version}',
    plugins: [
      ['@semantic-release/commit-analyzer', { preset: 'conventionalcommits' }],
      ['@semantic-release/release-notes-generator', { preset: 'conventionalcommits' }],
      '@semantic-release/changelog',
      ['semantic-release-tap', {}],
      ['@semantic-release/npm', { pkgRoot: './dist' }],
      '@semantic-release/git',
    ],
    _: [],
    $0: '..\\..\\node_modules\\semantic-release\\bin\\semantic-release.js',
    originalRepositoryURL: 'git@github.com:unlight/monorepo-playground.git',
    dryRun: true,
  },
  logger: 'Signale',
};
