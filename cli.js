#!/usr/bin/env node
const VERSION = '1.0.6'

const getPackFormat = require('./index.js')

const arg = n => process.argv[n + 1]

if (arg(1) && !arg(1).includes('h'))
    if (arg(1).includes('v'))
        console.log(`The current version of pack-format is ${VERSION}`)
    else
        console.log(`Pack format of ${arg(1)} is ${getPackFormat(arg(1))}`)
else
    console.log('Type `pack-format <version>` to retrieve the pack format of any Minecraft version.')

