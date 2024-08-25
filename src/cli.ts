import { getPackFormat, getPackFormats, getVersions, LATEST } from './index'
import { FormatResult } from './types'
const VERSION = require('../package.json').version

const indent = (n: number): string => ' '.repeat(n * 4)
const log = function (arg: string, desc: string[], example: string): void {
    console.log(`\n${indent(1)}pack-format ${arg}`)
    for (let i in desc)
        console.log(indent(2) + desc[i])
    console.log(`${indent(3)}Example: ${example}`)
}

const rawArgs = process.argv.slice(2)
const args = {
    help: rawArgs.some(arg => /^-+h/.test(arg)),
    version: rawArgs.some(arg => /^-+v/.test(arg)),
    resource: rawArgs.some(arg => /^-+r/.test(arg)),
    data: rawArgs.some(arg => /^-+d/.test(arg)),
    list: rawArgs.some(arg => /^-+l(?!atest)/.test(arg)),
    latest: rawArgs.some(arg => /^-+L|^-+latest/.test(arg)),
    _: rawArgs.filter(arg => !arg.startsWith('-')),
}
const ver = args._[0]

// Print the help message
if (args.help) {
    log(
        '<version>',
        ['Retrieve the resource and data pack formats of any Minecraft version.'],
        'pack-format 1.16',
    )
    log(
        '(--data|-d) <version>',
        ['Retrieve the data pack format only of the version.'],
        'pack-format --data 20w45a',
    )
    log(
        '(--resource|-r) <version>',
        ['Retrieve the resource pack format only of the version.'],
        'pack-format --resource 20w45a',
    )
    log(
        '(--list|-l) [(--data|-d)|(--resource|-r)] <pack_format>',
        ['Retrieve a list of versions attached to a specific pack format.', 'Defaults to --resource.'],
        'pack-format --list --data 6',
    )
    log(
        '(--latest|-L) [(--data|-d)|(--resource|-r)]',
        ['Retrieve the latest pack formats.'],
        'pack-format --latest --resource',
    )
}
// Print the current npm version
else if (args.version) {
    console.log(`pack-format ${VERSION}`)
}
// List versions of a given pack format
else if (args.list) {
    if (!ver) {
        console.error(`No pack format has been given`)
    }
    else if (Number.isNaN(ver)) {
        console.error(`'${ver}' is not a valid pack format`)
    }
    else if (!/^\d+$/.test(ver)) {
        console.error(`'${ver}' is a version number, not a pack format`)
    }
    else {
        const type = args.data ? 'data' : 'resource'
        const vers = getVersions(+ver, type)

        const rels = [vers.releases.min, vers.releases.max].filter(x => x)
        const snaps = [vers.snapshots.min, vers.snapshots.max].filter(x => x)
        const relText = ['', rels[0], rels.join('–')][[...new Set(rels)].length]
        const snapsText = ['', snaps[0], snaps.join('–')][[...new Set(snaps)].length]
        const fullText = relText ? `${relText} (${snapsText})` : `${snapsText}`

        if (snapsText)
            console.log(`A ${type} pack format of ${ver} is used for ${fullText}`)
        else
            console.log(`A ${type} pack format of ${ver} is not used`)

    }
}
// List the latest pack formats
else if (args.latest) {
    if (!args.resource) {
        console.log(`The latest data pack format version is ${LATEST.data}.`)
    }
    if (!args.data) {
        console.log(`The latest resource pack format version is ${LATEST.resource}.`)
    }
}
// Print the pack format of a given version
else if (ver) {
    const formatResult = (result: FormatResult): string => (result + '').replace('null', 'not present').replace('undefined', 'not known')
    if (!args.resource) {
        const result = formatResult(getPackFormat(ver, 'data'));
        console.log(`Data pack format of ${ver} is ${result}`)
    }
    if (!args.data) {
        const result = formatResult(getPackFormat(ver, 'resource'));
        console.log(`Resource pack format of ${ver} is ${result}`)
    }
}
// No input: print information
else {
    console.log(`pack-format: version ${VERSION}.`)
    console.log('Run pack-format --help for usage.')
}
