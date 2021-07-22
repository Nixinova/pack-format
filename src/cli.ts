import { getPackFormat, getVersions, LATEST } from './index'
const VERSION: string = require('../package.json').version

const arg = (n: number): string => process.argv[n + 1]
const indent = (n: number): string => ' '.repeat(n * 4)
const log = function (arg: string, desc: string[], example: string): void {
    console.log(`\n${indent(2)}pack-format ${arg}`)
    for (let i in desc)
        console.log(indent(3) + desc[i])
    console.log(`${indent(3)}Example: ${example}`)
}

if (arg(1) && !arg(1).includes('h')) {
    const cmd = arg(1)
    if (/^-*v/.test(cmd)) {
        console.log(`The current version of pack-format is ${VERSION}`)
    }
    else if (/^-*d/.test(cmd)) {
        const ver = arg(2)
        console.log(`Data pack format of ${ver} is ${getPackFormat(ver, 'data')}`)
    }
    else if (/^-*r/.test(cmd)) {
        const ver = arg(2)
        console.log(`Resource pack format of ${ver} is ${getPackFormat(ver, 'resource')}`)
    }
    else if (/^-*l/.test(cmd)) {
        if (arg(3)) console.log(getVersions(+arg(3), /^-*d/.test(arg(2)) ? 'data' : 'resource'))
        else console.log(getVersions(+arg(2)))
    }
    else if (/^-*L/.test(cmd)) {
        const type = /^-*d/.test(arg(2)) ? 'data' : 'resource'
        if (arg(2)) console.log(`The latest ${type} pack version is ${LATEST[type]}.`)
        else console.log(`The latest pack version is ${LATEST.resource}.`)
    }
    else {
        console.log(`Pack format of ${cmd} is ${getPackFormat(cmd)}`)
    }
}
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
    log(
        '(--latest|-L) [(--data|-d)|(--resource|-r)]',
        ['Retrieve the latest pack format.'],
        'pack-format --latest --resource',
    )
}
