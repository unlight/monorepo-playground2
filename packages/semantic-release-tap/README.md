# semantic-release-tap

> [semantic-release](https://github.com/semantic-release/semantic-release) plugin to deploy app

| Step               | Description          |
| ------------------ | -------------------- |
| `verifyConditions` | Verify configuration |
| `prepare`          |                      |

## Install

```bash
npm i --save-dev semantic-release-tap
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/caribou/docs/usage/configuration.md#configuration):

Add `semantic-release-tap` after `@semantic-release/npm` and `@semantic-release/git` plugins.

## Configuration

### Options

| Variable | Description                                          |
| -------- | ---------------------------------------------------- |
| `prefix` | Version prefix, can be `~`, `^`, default: '' (empty) |

### Examples

```json
{
  "plugins": [
    "@semantic-release/npm",
    "@semantic-release/git",
    ["semantic-release-tap", { "prefix": "~" }]
  ]
}
```
