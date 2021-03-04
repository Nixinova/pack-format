#!/usr/bin/env node
const VERSION: string = '1.1.3'

import getPackFormat from './index'

const arg = (n: number): string => process.argv[n + 1]

if (arg(1) && !arg(1).includes('h'))
    if (/^-*v/.test(arg(1)))
        console.log(`The current version of pack-format is ${VERSION}`)
    else if (/^-*d/.test(arg(1)))
        console.log(`Data pack format of ${arg(2)} is ${getPackFormat(arg(2), 'data')}`)
    else if (/^-*r/.test(arg(1)))
        console.log(`Resource pack format of ${arg(2)} is ${getPackFormat(arg(2), 'resource')}`)
    else
        console.log(`Pack format of ${arg(1)} is ${getPackFormat(arg(1))}`)
else {
    const indent = (n: number): string => ' '.repeat(n * 4)
    const log = function (arg: string, ...desc: string[]): void {
        console.log(`\n${indent(2)}pack-format ${arg}`)
        for (let i in desc)
            console.log(indent(+i + 3) + desc[i])
    }
    console.log(`\n${indent(1)}pack-format arguments:`)
    log('<version>', 'Retrieve the pack format of any Minecraft version.', 'Defaults to resource pack format when applicable.')
    log('(--data|-d) <version>', 'Retrieve the data pack format in particular when applicable.')
    log('(--resource|-r) <version>', 'Retrieve the resource pack format in particular when applicable.')
}
