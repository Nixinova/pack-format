#!/usr/bin/env node
const VERSION = '1.1.0'

const getPackFormat = require('./index.js')

const arg = n => process.argv[n + 1]

if (arg(1) && !arg(1).includes('h'))
    if (arg(1).includes('v'))
        console.log(`The current version of pack-format is ${VERSION}`)
    else if (arg(1).includes('d'))
        console.log(`Data pack format of ${arg(2)} is ${getPackFormat(arg(2), 'data')}`)
    else if (arg(1).includes('r'))
        console.log(`Resource pack format of ${arg(2)} is ${getPackFormat(arg(2), 'resource')}`)
    else
        console.log(`Pack format of ${arg(1)} is ${getPackFormat(arg(1))}`)
else {
    const log = (arg, desc) => {
        console.log(`\n\tpack-format ${arg}`)
        for (text of desc) console.log('\t    ' + text)
    }
    console.log(`\npack-format arguments:\n`)
    log('<version>', ['Retrieve the pack format of any Minecraft version.', '    Defaults to resource pack format when applicable.'])
    log('(--data|-d) <version>', ['Retrieve the data pack format in particular when applicable.'])
    log('(--resource|-r) <version>', ['Retrieve the resource pack format in particular when applicable.'])
}

