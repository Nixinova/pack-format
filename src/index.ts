import { VersionName, SnapshotName, PackType, FormatResult, VersionsResult } from './types'

class Snapshot {
    version: string
    constructor(version: string) { this.version = version }
    get year(): number { return parseInt(this.version.replace(/^(\d\d).+$/, '$1')) }
    get week(): number { return parseInt(this.version.replace(/^\d\dw(\d\d)\w$/, '$1')) }
    get id(): number { return (this.year - 10) * 52 + this.week }
}

// Data sets //

const LATEST = { resource: 7, data: 8 }

const START_RELEASES: Record<VersionName, Record<PackType, FormatResult>> = {
    '1.6.x': { resource: 1, data: undefined },
    '1.9.x': { resource: 2, data: undefined },
    '1.11.x': { resource: 3, data: undefined },
    '1.13.x': { resource: 4, data: 4 },
    '1.15.x': { resource: 5, data: 5 },
    '1.16.2': { resource: 6, data: 6 },
    '1.17.x': { resource: 7, data: 7 },
    '1.18.x': { resource: 7, data: 8 },
    '1.19.x': { resource: undefined, data: undefined },
}

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
    [fauxCurrentSnapshot]: { resource: undefined, data: undefined },
}

const SPECIAL: Record<number, string[]> = {
    4: ['combat1', 'combat2', 'combat3'],
    5: ['combat4', 'combat5'],
    6: ['combat6', 'combat7a', 'combat7b', 'combat8a', 'combat8b', 'combat8c'],
}

function getPackFormat(version: string, type: PackType = 'resource'): FormatResult {
    if (!version) return undefined
    version = version.toString().toLowerCase().trim()

    // Special //
    for (const format in SPECIAL) {
        if (SPECIAL[format].includes(version)) return +format
    }

    if (!version.includes('.') && !/\d{2}w\d{2}\w/.test(version)) return undefined

    // Snapshot //
    if (/^\d\d[w]\d\d[a-z]$/.test(version)) {
        const snapshot = new Snapshot(version)
        let ver: FormatResult
        for (const testSnap in START_SNAPSHOTS) {
            if (snapshot.id >= (new Snapshot(testSnap)).id) {
                ver = START_SNAPSHOTS[testSnap as SnapshotName][type]
            }
        }
        return ver
    }

    // Release //

    version = version
        .replace(/-? *pre[- ]?(release)? */, '-pre')
        .replace(/ *release candidate */, '-rc')
        .replace(/ *experimental *snapshot|-es/, '-exp')

    if (version.includes('-')) {
        // Special cases for specific development versions
        if (version.includes('1.16.2-pre')) return 5
        if (version.includes('1.18-e')) return 7
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

function getVersions(format: number, type: PackType = 'resource'): VersionsResult {
    let output: VersionsResult = {
        'releases': { 'min': '', 'max': '' },
        'snapshots': { 'min': '', 'max': '' },
    }
    if (!format || format > LATEST[type] || (type === 'data' && format < 4)) return output

    // Min and max releases
    const startReleases = Object.entries(START_RELEASES)
    const relIndex = startReleases.findIndex(([, data]) => data[type] === format)
    if (relIndex >= 0) {
        const minRelease = startReleases[relIndex][0]
        const maxRelease = startReleases[relIndex + 1][0].replace(/\.(\d+)\./, (_, major) => `.${major - 1}.`)
        output.releases.min = minRelease as VersionName
        output.releases.max = maxRelease as VersionName
    }

    // Min and max snapshots
    const startSnaps = Object.entries(START_SNAPSHOTS)
    const snapIndex = startSnaps.findIndex(([, data]) => data[type] === format)
    if (snapIndex >= 0) {
        const maxSnap = startSnaps[snapIndex][0]
        const minSnap = startSnaps[snapIndex + 1][0].replace(/(\d)\w$/, (_, n) => `${n - 1}a`)
        output.snapshots.min = maxSnap as SnapshotName
        output.snapshots.max = minSnap as SnapshotName
    }

    return output
}

getPackFormat.getPackFormat = getPackFormat
getPackFormat.getVersions = getVersions
getPackFormat.LATEST = LATEST

export = getPackFormat
