#!/usr/bin/env node

class Snapshot {
    version: string
    constructor(version: string) { this.version = version }
    get year() { return parseInt(this.version.replace(/^(\d\d).+$/, '$1')) }
    get week() { return parseInt(this.version.replace(/^\d\dw(\d\d)\w$/, '$1')) }
    get id() { return (this.year - 10) * 52 + this.week }
}

type packType = 'resource' | 'data'
type result = number | undefined

function getPackFormat(version: string, type?: packType): result {
    if (!version) return undefined
    version = version.toString().toLowerCase().trim()

    // Snapshot //

    if (/^\d\dw\d\d\w$/.test(version)) {
        const d: Date = new Date()
        const fauxCurrentSnapshot: string = (d.getFullYear() - 2000) + 'w' + ((d.getMonth() + 1) * 5) + 'a'
        const startSnapshots: Record<string, Record<packType, result>> = {
            '13w24a': { resource: 1, data: undefined },
            '15w31a': { resource: 2, data: undefined },
            '16w32a': { resource: 3, data: undefined },
            '17w48a': { resource: 4, data: 4 },
            '20w06a': { resource: 5, data: 5 },
            '20w45a': { resource: 7, data: 6 },
            '20w46a': { resource: 7, data: 7 },
            [fauxCurrentSnapshot]: { resource: undefined, data: undefined }
        }
        const snapshot = new Snapshot(version)

        let ver: result
        for (let testSnap in startSnapshots) {
            if (snapshot.id >= (new Snapshot(testSnap)).id) {
                ver = startSnapshots[testSnap][type || 'resource']
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

    const PACK_FORMATS: Record<number, Array<string>> = {
        1: ['1.6.x', '1.7.x', '1.8.x'],
        2: ['1.9.x', '1.10.x'],
        3: ['1.11.x', '1.12.x'],
        4: ['1.13.x', '1.14.x'],
        5: ['1.15.x', '1.16.0', '1.16.1'],
        6: ['1.16.x'],
        7: ['1.17.x'],
    }
    for (let i in PACK_FORMATS) {
        if (+i < 4 && type === 'data')
            return undefined
        for (let testVer of PACK_FORMATS[i]) {
            const matchExact = testVer === version
            const matchMinor = testVer.includes('x') && version.includes(testVer.replace('.x', ''))
            if (matchExact || matchMinor) return +i
        }
    }
    return undefined
}

export = getPackFormat
