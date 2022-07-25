# monorepo-playground

## Stack

- TypeScript

## Features

- Goto definition

## TODO

- [ ] update all related dependent package (try to run semrel for @acme/bar package dep @acme/foo should be updated to next version of foo)
- [ ] wireit
- [ ] switch to mjs
- [ ] remove @acme/bar from semantic-release-tap
- [ ] verify conditions put plugin (after semantic-release/git)
- [ ] verify conditions npm publish do not use tarball

## Commands

- set WIREIT_PARALLEL=1
- npm run build -w @acme/bar
- npm run -w packages/semantic-release-tap test:w
- npm run -w packages/semantic-release-tap build
- npm --node-options --inspect run -w packages/semantic-release-tap semantic-release -- --no-ci
- npx syncpack list-mismatches
- npx syncpack fix-mismatches --dev --peer --prod
- npm run -w examples/nestjs start:dev
- npm run -w packages/bar semantic-release
- npm --node-options --inspect run -w packages/bar semantic-release
- npm run -w packages/bar build
- npm pkg get repository.directory --json -ws
- nx run-many --target=build --all

## Projects dedicated to semantic release and monorepo

- https://github.com/semantic-release-plus/semantic-release-plus
- https://github.com/qiwi/multi-semantic-release
- https://github.com/dhoulb/multi-semantic-release
- https://github.com/pmowrer/semantic-release-monorepo
- https://github.com/atlassian/lerna-semantic-release

## Resources

- https://github.com/NiGhTTraX/ts-monorepo
- https://github.com/ryotah/monorepo-demo-nx-pnpm
- https://github.com/JamieMason/syncpack
- https://github.com/stars/unlight/lists/monorepo
- https://github.com/kshutkin/update-monorepo-package-json
- https://github.com/eclass/template-semantic-release-plugin
- https://github.com/azu/monorepo-utils
- https://github.com/tsedio/tsed-monorepo-utils
- https://github.com/npm/map-workspaces
- https://github.com/antongolub/git-root

## Notes

- wireit.[script] dependencies will executes in parallel
- use `git rev-list --tags="semantic-release-tap?v[0-9]*\.*" --max-count=100` to find commits
- use `git describe --tags --match="semantic-release-tap?v[0-9]*\.*" fb22bb56f5e0dc0b650c105370f898a8e85e062e` to find tag in commit
- `git tag --points-at fb22bb56f5e0dc0b650c105370f898a8e85e062e --points-at 86e1eba1 `
