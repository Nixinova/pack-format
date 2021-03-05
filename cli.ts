#!/usr/bin/env node

const VERSION: string = '1.2.0'

import { getPackFormat, getVersions } from './index'

const arg = (n: number): string => process.argv[n + 1]
const indent = (n: number): string => ' '.repeat(n * 4)
const log = function (arg: string, desc: string[], example: string): void {
    console.log(`\n${indent(2)}pack-format ${arg}`)
    for (let i in desc)
        console.log(indent(3) + desc[i])
    console.log(`${indent(3)}Example: ${example}`)
}

if (arg(1) && !arg(1).includes('h'))
    if (/^-*v/.test(arg(1)))
        console.log(`The current version of pack-format is ${VERSION}`)
    else if (/^-*d/.test(arg(1)))
        console.log(`Data pack format of ${arg(2)} is ${getPackFormat(arg(2), 'data')}`)
    else if (/^-*r/.test(arg(1)))
        console.log(`Resource pack format of ${arg(2)} is ${getPackFormat(arg(2), 'resource')}`)
    else if (/^-*l/.test(arg(1)))
        if (arg(3)) console.log(getVersions(+arg(3), /^-*d/.test(arg(2)) ? 'data' : 'resource'))
        else console.log(getVersions(+arg(2)))
    else
        console.log(`Pack format of ${arg(1)} is ${getPackFormat(arg(1))}`)
else {
    console.log(`\n${indent(1)}pack-format arguments:`)
    log(
        '<version>',
        ['Retrieve the pack format of any Minecraft version.', 'Defaults to resource pack format when applicable.'],
        'pack-format 1.16',
    )
    log(
        '(--data|-d) <version>',
        ['Retrieve the data pack format in particular when applicable.'],
        'pack-format --data 20w45a',
    )
    log(
        '(--resource|-r) <version>', 
        ['Retrieve the resource pack format in particular when applicable.'],
        'pack-format -r 20w45a',
    )
    log(
        '(--list|-l) [(--data|-d)|(--resource|-r)] <pack_format>', 
        ['Retrieve a list of versions attached to a specific pack format.'],
        'pack-format --list -d 6',
    )
}
