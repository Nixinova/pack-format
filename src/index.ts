import { VersionName, SnapshotName, PackType, FormatResult, VersionsResult } from './types'

// Data sets //

const START_RELEASES: Record<VersionName, Record<PackType, FormatResult>> = {
    '1.6.x': { resource: 1, data: undefined },
    '1.9.x': { resource: 2, data: undefined },
    '1.11.x': { resource: 3, data: undefined },
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
    '1.21.x': { resource: undefined, data: undefined },
}

const maxFormat = (type: 'resource' | 'data') => Math.max(...Object.values(START_RELEASES).map(release => release[type] ?? 0));
const LATEST = { resource: maxFormat('resource'), data: maxFormat('data') };

const d = new Date(), year = d.getFullYear() - 2000, maxWeek = (d.getMonth() + 1) * 5
const fauxCurrentSnapshot: SnapshotName = `${year}w${maxWeek.toString().padStart(2, '0')}a`
const START_SNAPSHOTS: Record<string, Record<PackType, FormatResult>> = {
    '13w24a': { resource: 1, data: undefined },
    '15w31a': { resource: 2, data: undefined },
    '16w32a': { resource: 3, data: undefined },
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
    [fauxCurrentSnapshot]: { resource: undefined, data: undefined },
}

const SPECIAL: Record<number, string[]> = {
    4: ['combat1', 'combat2', 'combat3'],
    5: ['combat4', 'combat5'],
    6: ['combat6', 'combat7a', 'combat7b', 'combat8a', 'combat8b', 'combat8c'],
}

/**
 * @param version the version to look up
 * @param type the pack format type to return; either 'resource' or 'data'
 * @returns the pack format for a given version
 */
function getPackFormat(version: string, type: PackType = 'resource'): FormatResult {
    if (!version) return undefined
    version = version.toString().toLowerCase().trim()

    // Special //
    for (const format in SPECIAL) {
        if (SPECIAL[format].includes(version)) return +format
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

    version = version
        .replace(/-? *pre[- ]?(release)? */, '-pre')
        .replace(/ *release candidate */, '-rc')
        .replace(/ *experimental *snapshot|-es/, '-exp')

    if (version.includes('-')) {
        // Special cases for specific development versions
        if (version.includes('1.16.2-pre')) return 5
        if (version.includes('1.18-e')) return 7
        if (version.includes('1.19.4-pre')) return { data: 12, resource: 13 }[type]
        // Default to the parent version
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
    let output: VersionsResult = {
        'releases': { 'min': '', 'max': '' },
        'snapshots': { 'min': '', 'max': '' },
    }
    if (!format || format > LATEST[type] || (type === 'data' && format < 4)) return output

    const getVersionBelow = function (ver: VersionName, minVer: VersionName): VersionName {
        const formatVer = ([x, y, z]: Array<string | number>) => [x, y, z].join('.') as VersionName
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
        const minRelease = startReleases[relIndex][0] as VersionName
        const maxRelease = getVersionBelow(lastWithFormat[0] as VersionName, minRelease)
        output.releases.min = minRelease
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
