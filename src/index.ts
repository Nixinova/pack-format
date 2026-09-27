import _highestMinors from './data/highestMinors.json'
import _special from './data/special.json'
import _startReleases from './data/startReleases.json'
import _startSnapshots from './data/startSnapshots.json'
import parseJson from './parseJson'
import { FormatResult, PackType, SnapshotName, VersionName, VersionsResult } from './types'

const highestMinors = parseJson<Record<string, number>>(_highestMinors)
const startReleases = parseJson<Record<VersionName, Record<PackType, FormatResult>>>(_startReleases)
const startSnapshots = parseJson<Record<string, Record<PackType, FormatResult>>>(_startSnapshots)
const special = parseJson<Record<PackType, Record<number, string[]>>>(_special)

// Find latest release & snapshot version (the one before the placeholder version that has data 'undefined')
const LATEST_REL = Object.keys(startReleases).reverse().filter(ver => !!startReleases[ver as VersionName].data)[0]
const LATEST_SNAP = Object.keys(startSnapshots).reverse().filter(ver => !!startSnapshots[ver as VersionName].data)[0]
const maxFormat = (type: 'resource' | 'data') => Math.max(...[...Object.values(startSnapshots), ...Object.values(startReleases)].map(release => release[type] ?? 0))

const LATEST = {
    resource: maxFormat('resource'),
    data: maxFormat('data'),
    version: LATEST_REL,
    snapshot: LATEST_SNAP,
}

/**
 * @param version the version to look up
 * @param type the pack format type to return; either 'resource' or 'data'
 * @returns the pack format for a given version
 */
function getPackFormat(version: string, type: PackType = 'resource'): FormatResult {
    if (!version) return undefined

    // Prepare version string for comparison
    version = version
        .toString()
        .trim()
        .toLowerCase()
        // Aliasing
        .replace(/-? *snap(shot)-? */i, '-snapshot-')
        .replace(/-? *pre[- ]?(?:release)? */, '-pre')
        .replace(/ *release candidate */, '-rc')
        .replace(/-? *exp(?:erimental)? *(?:snapshot)?|-es/, '-exp')
        .replace(/^c(?:ombat)? *t(?:est)? */, 'combat')

    // Special //
    for (const format in special[type]) {
        if (special[type][format].find((ver) => /\d$/.test(ver) ? version === ver : version.startsWith(ver)))
            return +format
    }

    // Legacy snapshot //
    if (/^\d{2}w\d{2}[a-z]?$/.test(version)) {
        const getId = (snap: string) => +snap.replace(/[^\d]/g, '')
        for (const testSnap of Object.keys(startSnapshots).reverse()) {
            if (getId(version) < getId(testSnap)) continue
            return startSnapshots[testSnap as SnapshotName][type]
        }
        return undefined
    }
    if (!version.includes('.')) return undefined

    // Release //

    if (version.includes('-')) {
        // Default to the parent version if it doesn't match the special cases from before
        version = version.replace(/-.+$/, '')
    }

    for (const testVer of Object.keys(startReleases).reverse()) {
        const getId = (ver: string): number => {
            const [era, major, minor] = ver.split('.').map(Number)
            return era * 1e4 + major * 1e2 + (minor ?? 0)
        }
        if (getId(testVer.replace('.x', '')) > getId(version)) continue
        return startReleases[testVer as VersionName][type]
    }

    return undefined
}

/**
 * @param version the version to look up
 * @returns an object containing the resource and data pack formats for a given version
 */
function getPackFormats(version: string): Record<PackType, FormatResult> {
    const resource = getPackFormat(version, 'resource')
    const data = getPackFormat(version, 'data')
    return { resource, data }
}

/**
 * Retrieve a list of applicable versions for a given pack format
 * @param format the pack format to look up
 * @param type the pack format type to return; either 'resource' or 'data'
 * @returns an object containing minimum and maximum applicable release and snapshot versions
 */
function getVersions(format: number, type: PackType = 'resource'): VersionsResult {
    const output: VersionsResult = {
        'releases': { 'min': null, 'max': null },
        'snapshots': { 'min': null, 'max': null },
    }
    if (!format || format > LATEST[type] || (type === 'data' && format < 4)) return output

    const getVersionBelow = function (ver: VersionName, minVer: VersionName): VersionName {
        const toHighestMinor = (ver: VersionName): VersionName => {
            const [major, minor] = ver.split('.')
            const prefix = major === '1' ? major + '.' + minor : major
            return ver.replace('.x', '.' + highestMinors[prefix as keyof typeof highestMinors]) as VersionName
        }
        const formatVer = ([x, y, z]: Array<string | number>) => toHighestMinor([x, y, z].join('.') as VersionName)
        const [minX, minY, minZ] = minVer.split('.')
        const [x, y, z] = ver.split('.')
        // (1.X.a) vs 1.X.b
        if (minY === y) {
            if (z === 'x') return formatVer([x, y, z])
            else return formatVer([x, y, +z - 1])
        }
        // (1.X.a) vs 1.Y.b
        else {
            if (z === 'x') return formatVer([x, +y - 1, z])
            else return formatVer([x, y, +z - 1])
        }
    }

    // Min and max releases
    const startRels = Object.entries(startReleases)
    const relIndex = startRels.findIndex(([, data]) => data[type] === format)
    if (relIndex >= 0) {
        const lastWithFormat = startRels.find(([, obj]) => (obj[type] ?? 0) > format)?.[0]
        const minRelease = startRels[relIndex][0].replace('.x', '') as VersionName
        const maxRelease = lastWithFormat ? getVersionBelow(lastWithFormat as VersionName, minRelease) : LATEST_REL
        output.releases.min = minRelease as VersionName
        output.releases.max = maxRelease as VersionName
    }

    // Min and max snapshots
    const startSnaps = Object.entries(startSnapshots)
    const snapIndices = startSnaps.flatMap((item) => item[1][type] === format ? startSnaps.indexOf(item) : [])
    if (snapIndices.length) {
        const minIndex = snapIndices[0]
        const maxIndex = snapIndices[snapIndices.length - 1]
        const maxSnap = startSnaps[minIndex][0]
        const minSnap = startSnaps[maxIndex + 1][0].replace(/(\d+)\w$/, (_, n) => `${(n - 1).toString().padStart(2, '0')}a`)
        output.snapshots.min = maxSnap as SnapshotName
        output.snapshots.max = minSnap as SnapshotName
    }

    return output
}

getPackFormat.getPackFormat = getPackFormat
getPackFormat.getPackFormats = getPackFormats
getPackFormat.getVersions = getVersions
getPackFormat.LATEST = LATEST

export = getPackFormat
