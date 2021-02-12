#!/usr/bin/env node

class Snapshot {
    constructor(version) { this.version = version }
    getYear() { return parseInt(this.version.replace(/^(\d\d).+$/, '$1')) }
    getWeek() { return parseInt(this.version.replace(/^\d\dw(\d\d)\w$/, '$1')) }
    getID() { return (this.getYear() - 10) * 52 + this.getWeek() }
}

function getPackFormat(version, type) {
    if (!version) return
    version = version.toString()

    // Snapshot //

    if (/^\d\dw\d\d\w$/.test(version)) {
        const startSnapshots = {
            '13w24a': 1,
            '15w31a': 2,
            '16w32a': 3,
            '17w48a': 4,
            '20w06a': 5,
            '20w45a': { resource: 7, data: 6 },
            '20w46a': 7,
        }
        const snapshot = new Snapshot(version)

        let ver;
        for (let snap in startSnapshots) {
            if (snapshot.getID() >= (new Snapshot(snap)).getID()) {
                ver = startSnapshots[snap];
            }
        }
        return ['number','undefined'].includes(typeof ver) ? ver : ver[type || 'resource'];
    }

    // Release //

    version = version.toLowerCase().replace(' pre-release ', '-pre').replace(' release candidate ', '-rc')

    if (version.includes('-')) {
        if (version.includes('1.16.2-pre')) return 5
        else version = version.replace(/-.+$/, '')
    }
    if (version.match(/^\d+\.\d+$/)) version += '.0'

    const PACK_FORMATS = {
        1: ['1.6.x', '1.7.x', '1.8.x'],
        2: ['1.9.x', '1.10.x'],
        3: ['1.11.x', '1.12.x'],
        4: ['1.13.x', '1.14.x'],
        5: ['1.15.x', '1.16', '1.16.1'],
        6: ['1.16.x'],
        7: ['1.17.x'],
    }
    for (let i in PACK_FORMATS) {
        for (let testVer of PACK_FORMATS[i]) {
            const matchExact = testVer === version
            const matchMinor = testVer.includes('x') && version.includes(testVer.replace('.x', ''))
            if (matchExact || matchMinor) return parseInt(i)
        }
    }
}

module.exports = getPackFormat
