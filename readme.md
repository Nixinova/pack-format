[![Latest version](https://img.shields.io/github/v/release/Nixinova/pack-format?label=latest&style=flat-square)](https://github.com/Nixinova/pack-format/releases)
[![npm downloads](https://img.shields.io/npm/dt/pack-format?style=flat-square)](https://www.npmjs.com/package/pack-format)
[![Last updated](https://img.shields.io/github/release-date-pre/Nixinova/pack-format?label=updated&style=flat-square)](https://github.com/Nixinova/pack-format/releases)

# pack-format

pack-format is a Node.js tool for retrieving the `pack_format` of any Minecraft version, including snapshots.

## About

`pack_format` is a version number used by Minecraft in both resource packs and data packs for labeling compatible versions.
It was added in Minecraft version 1.6, and as such using this tool on any version prior to that will just return `undefined`.

## Install

pack-format is available on [npm](https://www.npmjs.com/package/pack-format).

To install pack-format, open your command prompt and type `npm install pack-format` to use for a Node.js project, or `npm install -g pack-format` to use from the command line.

## Usage

### Node

```js
const packFormat = require('pack-format')
packFormat('1.14.4') // 4
packFormat('1.16.2-pre1', 'resource') // 5
packFormat('20w45a', 'data') // 6
```

### Command line

`pack-format [--data|--resource] <version>`

```sh
> pack-format 1.14.4
Pack format of 1.14.4 is 4

> pack-format --resource 1.16.2-pre1
Resource pack format of 1.16.2-pre1 is 5

> pack-format --data 20w30a
Data pack format of 20w45a is 6
```
