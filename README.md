# monorepo-playground

## Stack

- TypeScript

## Features

- Goto definition

## TODO

- [ ] semantic-release
  - [ ] update all related dependent package (try to run semrel for @acme/bar package dep @acme/foo should be updated to next version of foo)
  - [ ] need find api which works with workspaces
- [ ] wireit
- [ ] switch to mjs

## Commands

- set WIREIT_PARALLEL=1
- npm run build -w @acme/bar
- npm run -w packages/semantic-release-tap test:w
- npm --node-options --inspect run -w packages/semantic-release-tap semantic-release -- --no-ci
- npx syncpack list-mismatches
- npx syncpack fix-mismatches --dev --peer --prod
- npm run -w examples/nestjs start:dev
- npm run -w packages/bar semantic-release
- npm --node-options --inspect run -w packages/bar semantic-release
- npm run -w packages/bar build
- npm pkg get repository.directory --json -ws
- nx run-many --target=build --all

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
