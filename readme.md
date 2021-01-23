# pack-format

pack-format is a Node.js tool for retrieving the `pack_format` of any Minecraft version, including snapshots.

## About

`pack_format` is a version number used in both resource packs and data packs for labeling compatible versions.
It was added in version 1.6, and as such using this tool on any version prior to that will just return `undefined`.

## Install

Using npm, type `npm install pack-format` to use for a Node.js project, or `npm install -g pack-format` to use from the command line.

## Usage

### Node

```js
const getPackFormat = require('pack-format')
console.log( getPackFormat('1.14.3') ) // 4
console.log( getPackFormat('1.16.2-pre1') ) // 5
console.log( getPackFormat('15w42a') ) // 2
console.log( getPackFormat('1.4.7') ) // undefined
```

### Command line

```
pack-format <version>
```
