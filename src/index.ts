import { VersionName, SnapshotName, PackType, FormatResult, VersionsResult } from './types'

class Snapshot {
    version: string
    constructor(version: string) { this.version = version }
    get year(): number { return parseInt(this.version.replace(/^(\d\d).+$/, '$1')) }
    get week(): number { return parseInt(this.version.replace(/^\d\dw(\d\d)\w$/, '$1')) }
    get id(): number { return (this.year - 10) * 52 + this.week }
}

const RELEASES: Record<number, VersionName[]> = {
    1: ['1.6.x', '1.7.x', '1.8.x'],
    2: ['1.9.x', '1.10.x'],
    3: ['1.11.x', '1.12.x'],
    4: ['1.13.x', '1.14.x'],
    5: ['1.15.x', '1.16.0', '1.16.1'],
    6: ['1.16.x'],
    7: ['1.17.x'],
}

const d = new Date()
const fauxCurrentSnapshot = (d.getFullYear() - 2000) + 'w' + ((d.getMonth() + 1) * 5).toString().padStart(2, '0') + 'a' as SnapshotName
const START_SNAPSHOTS: Record<SnapshotName | string, Record<PackType, FormatResult>> = {
    '13w24a': { resource: 1, data: undefined },
    '15w31a': { resource: 2, data: undefined },
    '16w32a': { resource: 3, data: undefined },
    '17w48a': { resource: 4, data: 4 },
    '20w06a': { resource: 5, data: 5 },
    '20w45a': { resource: 7, data: 6 },
    '20w46a': { resource: 7, data: 7 },
    [fauxCurrentSnapshot]: { resource: undefined, data: undefined },
}

const LATEST = { resource: 7, data: 7 }

function getPackFormat(version: string, type: PackType = 'resource'): FormatResult {
    if (!version) return undefined
    version = version.toString().toLowerCase().trim()

    // Snapshot //

    if (/^\d\d[w]\d\d[a-z]$/.test(version)) {
        const snapshot = new Snapshot(version)
        let ver: FormatResult
        for (let testSnap of Object.keys(START_SNAPSHOTS)) {
            if (snapshot.id >= (new Snapshot(testSnap)).id) {
                ver = START_SNAPSHOTS[testSnap][type]
            }
        }
        return ver
    }

    // Release //

    version = version.replace(/-? *pre[- ]?(release)? */, '-pre').replace(/ *release candidate */, '-rc')

    if (version.includes('-')) {
        if (version.includes('1.16.2-pre')) return 5
        else version = version.replace(/-.+$/, '')
    }
    if (version.match(/^\d+\.\d+$/)) version += '.0'

    for (let i in RELEASES) {
        if (+i < 4 && type === 'data') continue
        for (let testVer of RELEASES[i]) {
            const matchExact = testVer === version
            const matchMinor = testVer.includes('x') && version.includes(testVer.replace('.x', ''))
            if (matchExact || matchMinor) return +i
        }
    }

    return undefined
}

function getVersions(format: number, type: PackType = 'resource'): VersionsResult {
    let output: VersionsResult = {
        'releases': { 'min': '', 'max': '' },
        'snapshots': { 'min': '', 'max': '' },
    }
    if (!format || format > LATEST[type] || (type === 'data' && format < 4)) return output

    output.releases.min = RELEASES[format][0]
    output.releases.max = RELEASES[format].slice(-1)[0]

    const startSnaps: string[] = Object.keys(START_SNAPSHOTS)
    for (const snap in START_SNAPSHOTS) {
        if (START_SNAPSHOTS[snap][type] === format) {
            let maxSnap = snap as SnapshotName
            let i = 1
            do {
                const nextSnap = startSnaps[startSnaps.indexOf(snap) + i++] as SnapshotName
                if (nextSnap) maxSnap = nextSnap
                else break
            }
            while (getPackFormat(maxSnap, type) === getPackFormat(snap, type))

            output.snapshots.min = snap as SnapshotName
            output.snapshots.max = maxSnap.replace(/(\d\d)[a-z]$/, (_, n) => (+n - 1).toString() + 'a') as SnapshotName
            break
        }
    }

    return output
}

getPackFormat.getPackFormat = getPackFormat
getPackFormat.getVersions = getVersions
getPackFormat.LATEST = LATEST

export = getPackFormat
