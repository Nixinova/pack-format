[![Latest version](https://img.shields.io/github/v/release/Nixinova/pack-format?label=latest&style=flat-square)](https://github.com/Nixinova/pack-format/releases)
[![npm downloads](https://img.shields.io/npm/dt/pack-format?style=flat-square)](https://www.npmjs.com/package/pack-format)
[![Last updated](https://img.shields.io/github/release-date-pre/Nixinova/pack-format?label=updated&style=flat-square)](https://github.com/Nixinova/pack-format/releases)

# pack-format

pack-format is a tool for retrieving the `pack_format` of any Minecraft version, including snapshots.

## About

`pack_format` is a version number used by Minecraft in both resource packs and data packs for labeling compatible versions.
It was added in Minecraft version 1.6, and as such using this tool on any version prior to that will just return `undefined`.

## Install

pack-format is available on [npm](https://www.npmjs.com/package/pack-format).
You must have Node.js installed to be able to use this.

To install pack-format, open the command line and type `npm install pack-format` to use for a Node.js project, or `npm install -g pack-format` to use from the command line.

## Usage

### Node

Retrieve the `pack_format` of a given Minecraft version, optionally specifying whether the resource (default) or data pack version should be returned.

```js
const packFormat = require('pack-format')
packFormat('1.14.4') // 4
packFormat('1.16.2-pre1', 'resource') // 5
packFormat('20w45a', 'data') // 6
packFormat.LATEST.data // 10
```

Retrieve a list of versions corresponding to a specific `pack_format`, again optionally specifying resource/data pack version.

```js
const {getVersions} = require('pack-format')
getVersions(3) // { releases: { min: '1.11.x', max: '1.12.x' }, snapshots: { min: '16w32a', max: '17w47a' } }
getVersions(6, 'data') // { releases: { min: '1.15.x', max: '1.16.1' }, snapshots: { min: '20w06a', max: '20w44a' } }
```

### Command line

Retrieve both the resource and data `pack_format` of a given Minecraft version:
```console
pack-format [--data|--resource] <version>
```

Retrieve a list of corresponding Minecraft versions:
```console
pack-format --list [--data|--resource] <pack_format>
```

Examples:
```console
> pack-format 1.14.4
Resource pack format of 1.14.4 is 4
Data pack format of 1.14.4 is 4

> pack-format --resource 1.16.2-pre1
Resource pack format of 1.16.2-pre1 is 5

> pack-format --data 20w45a
Data pack format of 20w45a is 6

> pack-format --list --resource 3
{ releases: { min: '1.11.x', max: '1.12.x' }, snapshots: { min: '16w32a', max: '17w47a' } }
```
