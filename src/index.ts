import { VersionName, SnapshotName, PackType, FormatResult, VersionsResult } from './types'

// Data sets //

/**
 * The highest minor version for each major version. 
 * Example: 1.5 has '2', since the highest minor version for 1.5.x was 1.5.2.
 */ 
const HIGHEST_MINORS: number[] = [
    /*1.0*/0, /*1.1*/0, /*1.2*/5, /*1.3*/2, /*1.4*/7, /*1.5*/2, /*1.6*/4, /*1.7*/10, /*1.8*/9, /*1.9*/4,
    /*1.10*/2, /*1.11*/2, /*1.12*/2, /*1.13*/2, /*1.14*/4, /*1.15*/2, /*1.16*/5, /*1.17*/1, /*1.18*/2, /*1.19*/2,
    /*1.20*/6, /*1.21*/5,
]

const START_RELEASES: Record<VersionName, Record<PackType, FormatResult>> = {
    '1.0.x': { resource: null, data: null },
    '1.6.x': { resource: 1, data: null },
    '1.9.x': { resource: 2, data: null },
    '1.11.x': { resource: 3, data: null },
    '1.13.x': { resource: 4, data: 4 },
    '1.15.x': { resource: 5, data: 5 },
    '1.16.2': { resource: 6, data: 6 },
    '1.17.x': { resource: 7, data: 7 },
    '1.18.x': { resource: 8, data: 8 },
    '1.18.2': { resource: 8, data: 9 },
    '1.19.x': { resource: 9, data: 10 },
    '1.19.3': { resource: 12, data: 10 },
    '1.19.4': { resource: 12, data: 12 },
    '1.20.x': { resource: 15, data: 15 },
    '1.20.2': { resource: 18, data: 18 },
    '1.20.3': { resource: 22, data: 26 },
    '1.20.5': { resource: 32, data: 41 },
    '1.20.6': { resource: 32, data: 41 },
    '1.21': { resource: 34, data: 48 },
    '1.21.2': { resource: 42, data: 57 },
    '1.21.4': { resource: 46, data: 61 },
    '1.21.5': { resource: 55, data: 71 },
    '1.21.6': { resource: 63, data: 80 },
    '1.21.7': { resource: 64, data: 81 },
    // future versions: return undefined
    '1.21.8': { resource: undefined, data: undefined },
    '1.22.x': { resource: undefined, data: undefined },
}
const START_SNAPSHOTS: Record<string, Record<PackType, FormatResult>> = {
    '13w24a': { resource: 1, data: null },
    '15w31a': { resource: 2, data: null },
    '16w32a': { resource: 3, data: null },
    '17w48a': { resource: 4, data: 4 },
    '20w06a': { resource: 5, data: 5 },
    '20w45a': { resource: 7, data: 6 },
    '20w46a': { resource: 7, data: 7 },
    '21w37a': { resource: 7, data: 8 },
    '21w39a': { resource: 8, data: 8 },
    '22w11a': { resource: 9, data: 10 },
    '22w42a': { resource: 11, data: 10 },
    '22w45a': { resource: 12, data: 10 },
    '23w03a': { resource: 12, data: 11 },
    '23w06a': { resource: 12, data: 12 },
    '23w12a': { resource: 13, data: 13 },
    '23w14a': { resource: 14, data: 13 },
    '23w16a': { resource: 14, data: 14 },
    '23w17a': { resource: 15, data: 14 },
    '23w18a': { resource: 15, data: 15 },
    '23w31a': { resource: 16, data: 16 },
    '23w32a': { resource: 17, data: 17 },
    '23w40a': { resource: 18, data: 19 },
    '23w41a': { resource: 18, data: 20 },
    '23w42a': { resource: 19, data: 21 },
    '23w43a': { resource: 20, data: 22 },
    '23w44a': { resource: 20, data: 23 },
    '23w45a': { resource: 21, data: 24 },
    '23w46a': { resource: 21, data: 25 },
    '23w51a': { resource: 22, data: 27 },
    '24w03a': { resource: 24, data: 28 },
    '24w04a': { resource: 24, data: 29 },
    '24w05a': { resource: 25, data: 30 },
    '24w06a': { resource: 26, data: 31 },
    '24w07a': { resource: 26, data: 32 },
    '24w09a': { resource: 28, data: 33 },
    '24w10a': { resource: 28, data: 34 },
    '24w11a': { resource: 29, data: 35 },
    '24w12a': { resource: 30, data: 36 },
    '24w13a': { resource: 31, data: 37 },
    '24w14a': { resource: 31, data: 38 },
    '24w18a': { resource: 33, data: 42 },
    '24w19a': { resource: 33, data: 43 },
    '24w20a': { resource: 33, data: 44 },
    '24w21a': { resource: 34, data: 45 },
    '24w33a': { resource: 35, data: 49 },
    '24w34a': { resource: 36, data: 50 },
    '24w35a': { resource: 36, data: 51 },
    '24w36a': { resource: 37, data: 52 },
    '24w37a': { resource: 38, data: 53 },
    '24w38a': { resource: 39, data: 54 },
    '24w39a': { resource: 39, data: 55 },
    '24w40a': { resource: 40, data: 56 },
    '24w44a': { resource: 43, data: 58 },
    '24w45a': { resource: 44, data: 59 },
    '24w46a': { resource: 45, data: 60 },
    '25w02a': { resource: 47, data: 62 },
    '25w03a': { resource: 48, data: 63 },
    '25w04a': { resource: 49, data: 64 },
    '25w05a': { resource: 50, data: 65 },
    '25w06a': { resource: 51, data: 66 },
    '25w07a': { resource: 52, data: 67 },
    '25w08a': { resource: 53, data: 68 },
    '25w09a': { resource: 53, data: 69 },
    '25w10a': { resource: 54, data: 70 },
    '25w15a': { resource: 56, data: 72 },
    '25w16a': { resource: 57, data: 73 },
    '25w17a': { resource: 58, data: 74 },
    '25w18a': { resource: 59, data: 75 },
    '25w19a': { resource: 60, data: 76 },
    '25w20a': { resource: 61, data: 77 },
    '25w21a': { resource: 62, data: 78 },

    // The below should be the last released snapshot + 1 week
    ['25w26a']: { resource: undefined, data: undefined },
}

const SPECIAL: Record<PackType, Record<number, string[]>> = {
    resource: {
        4: ['combat1', 'combat2', 'combat3'],
        5: ['1.16.2-pre', 'combat4', 'combat5'],
        6: ['combat6', 'combat7a', 'combat7b', 'combat8a', 'combat8b', 'combat8c'],
        7: ['1.18-exp'],
        13: ['1.19.4-pre'],
        17: ['1.20.2-pre1'],
        31: ['1.20.5-pre1', '1.20.5-pre2', '1.20.5-pre3'],
        32: ['1.20.5-pre4', '1.20.5-rc'],
        41: ['1.21.2-pre1', '1.21.2-pre2'],
        42: ['1.21.2-pre3', '1.21.2-pre4', '1.21.2-pre5', '1.21.2-rc'],
        63: ['1.21.7-rc1'],
    },
    data: {
        4: ['combat1', 'combat2', 'combat3'],
        5: ['1.16.2-pre', 'combat4', 'combat5'],
        6: ['combat6', 'combat7a', 'combat7b', 'combat8a', 'combat8b', 'combat8c'],
        7: ['1.18-exp'],
        12: ['1.19.4-pre'],
        39: ['1.20.5-pre1'],
        40: ['1.20.5-pre2'],
        41: ['1.20.5-pre3', '1.20.5-pre4', '1.20.5-rc'],
        46: ['1.21-pre1'],
        47: ['1.21-pre2'],
        48: ['1.21-pre3'],
        57: ['1.21.2-pre'],
        60: ['1.21.4-pre1'],
        70: ['1.21.5-pre1'],
        79: ['1.21.6-pre1', '1.21.6-pre2'],
        80: ['1.21.7-rc1'],
    },
}

// Find latest release & snapshot version (the one before the placeholder version that has data 'undefined')
const LATEST_REL = Object.keys(START_RELEASES).reverse().find(ver => !!START_RELEASES[ver as VersionName].data)
const LATEST_SNAP = Object.keys(START_SNAPSHOTS).reverse().find(ver => !!START_SNAPSHOTS[ver as VersionName].data)

const maxFormat = (type: 'resource' | 'data') => Math.max(...[...Object.values(START_SNAPSHOTS), ...Object.values(START_RELEASES)].map(release => release[type] ?? 0));

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
        .replace(/-? *pre[- ]?(?:release)? */, '-pre')
        .replace(/ *release candidate */, '-rc')
        .replace(/-? *exp(?:erimental)? *(?:snapshot)?|-es/, '-exp')
        .replace(/^c(?:ombat)? *t(?:est)? */, 'combat')

    // Special //
    for (const format in SPECIAL[type]) {
        if (SPECIAL[type][format].find((ver) => version.includes(ver))) return +format
    }

    // Snapshot //
    if (/^\d{2}w\d{2}[a-z]?$/.test(version)) {
        const getId = (snap: string) => +snap.replace(/[^\d]/g, '')
        for (const testSnap of Object.keys(START_SNAPSHOTS).reverse()) {
            if (getId(version) < getId(testSnap)) continue
            return START_SNAPSHOTS[testSnap as SnapshotName][type]
        }
        return undefined
    }
    if (!version.includes('.')) return undefined

    // Release //

    if (version.includes('-')) {
        // Default to the parent version if it doesn't match the special cases from before
        version = version.replace(/-.+$/, '')
    }

    for (const testVer of Object.keys(START_RELEASES).reverse()) {
        const getId = (ver: string): number => {
            const [, major, minor] = ver.split('.')
            return +major.padStart(3, '0') + +(minor ?? 0) / 100
        }
        if (getId(testVer.replace('.x', '')) > getId(version)) continue
        return START_RELEASES[testVer as VersionName][type]
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
            const major = ver.split('.')[1]
            return ver.replace('.x', '.' + HIGHEST_MINORS[+major]) as VersionName
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
    const startReleases = Object.entries(START_RELEASES)
    const relIndex = startReleases.findIndex(([, data]) => data[type] === format)
    if (relIndex >= 0) {
        const lastWithFormat = startReleases.find(([, obj]) => (obj[type] ?? 0) > format) ?? []
        const minRelease = startReleases[relIndex][0].replace('.x', '') as VersionName
        const maxRelease = getVersionBelow(lastWithFormat[0] as VersionName, minRelease)
        output.releases.min = minRelease as VersionName
        output.releases.max = maxRelease
    }

    // Min and max snapshots
    const startSnaps = Object.entries(START_SNAPSHOTS)
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
