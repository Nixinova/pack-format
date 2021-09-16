import yargs from 'yargs-parser';

import { getPackFormat, getVersions, LATEST } from './index'
import { version as VERSION } from '../package.json';

const indent = (n: number): string => ' '.repeat(n * 4)
const log = function (arg: string, desc: string[], example: string): void {
    console.log(`\n${indent(2)}pack-format ${arg}`)
    for (let i in desc)
        console.log(indent(3) + desc[i])
    console.log(`${indent(3)}Example: ${example}`)
}

const argOpts: yargs.Options = {
    alias: {
        help: ['h'],
        version: ['v'],
        resource: ['r'],
        data: ['d'],
        list: ['l'],
        latest: ['L'],
    },
    boolean: ['help', 'version', 'resource', 'data', 'list', 'latest'],
}
const args = yargs(process.argv.slice(2), argOpts)
const ver = args._[0];

if (ver) {
    if (args.version) {
        console.log(`pack-format v${VERSION}`)
    }
    else if (args.list) {
        console.debug(ver, args)
        if (Number.isNaN(ver)) throw new Error(`'${ver}' is not a valid pack format`)
        if (Math.round(+ver) !== +ver) throw new Error(`'${ver}' is a version number, not a pack format`)
        const type = args.data ? 'data' : 'resource'
        console.log(getVersions(+ver, type))
    }
    else if (args.data) {
        console.log(`Data pack format of ${ver} is ${getPackFormat(ver, 'data')}`)
    }
    else if (args.resource) {
        console.log(`Resource pack format of ${ver} is ${getPackFormat(ver, 'resource')}`)
    }
    else {
        console.log(`Pack format of ${ver} is ${getPackFormat(ver)}`)
    }
}
else if (args.latest) {
    const type = args.data ? 'data' : args.resource ? 'resource' : ''
    if (type) console.log(`The latest ${type} pack version is ${LATEST[type]}.`)
    else console.log(`The latest pack version is ${LATEST.resource}.`)
}
if (args.help) {
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
