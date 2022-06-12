import { getPackFormat, getPackFormats, getVersions, LATEST } from './index'
const VERSION = require('../package.json').version

const indent = (n: number): string => ' '.repeat(n * 4)
const log = function (arg: string, desc: string[], example: string): void {
    console.log(`\n${indent(2)}pack-format ${arg}`)
    for (let i in desc)
        console.log(indent(3) + desc[i])
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
    console.log(`\n${indent(1)}pack-format arguments:`)
    log(
        '<version>',
        ['Retrieve the resource and data pack formats of any Minecraft version.'],
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
    else if (/^\d+$/.test(ver)) {
        console.error(`'${ver}' is a version number, not a pack format`)
    }
    else {
        const type = args.data ? 'data' : 'resource'
        console.log(`Versions for ${type} pack format ${ver}:`)
        console.log(getVersions(+ver, type))
    }
}
// List the latest pack formats
else if (args.latest) {
    const type = args.data ? 'data' : args.resource ? 'resource' : ''
    if (type) {
        console.log(`The latest ${type} pack format version is ${LATEST[type]}.`)
    }
    else {
        console.log('The latest pack format versions are', LATEST)
    }
}
// Print the pack format of a given version
else if (ver) {
    if (args.data) {
        console.log(`Data pack format of ${ver} is ${getPackFormat(ver, 'data')}`)
    }
    else if (args.resource) {
        console.log(`Resource pack format of ${ver} is ${getPackFormat(ver, 'resource')}`)
    }
    else {
        console.log(`Pack formats for ${ver} are`, getPackFormats(ver))
    }
}
