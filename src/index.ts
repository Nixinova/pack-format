import formatData from './data.json'
import { FormatResult, PackType, VersionName, VersionsResult } from './types'

// Data prepare
const verData = Object.entries(formatData).map(([version, verData]) => ({
    version: version as VersionName,
    verData,
}))
const isDevVer = (version: VersionName) => version.includes('-') || version.includes('w')
const isRelease = (version: VersionName) => !isDevVer(version) && !version.includes('combat')

// Find latest release & snapshot version
const LATEST_REL = verData.reverse().find(({ version }) => isRelease(version))
const LATEST_SNAP = verData.reverse().find(({ version }) => isDevVer(version))
const maxFormat = (type: 'resource' | 'data') => Math.max(
    ...verData.map(x => x.verData?.[type]).filter(x => x != null) as number[]
)

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
        .replace(/-? *exp(?:erimental)? *(?:snapshot)? */, '-es')
        .replace(/-? *snap(shot)-? */i, '-snap')
        .replace(/-? *pre[- ]?(?:release)? */, '-pre')
        .replace(/ *release candidate */, '-rc')
        .replace(/^c(?:ombat)? *t(?:est)? */, 'combat')

    const resultData = formatData[version as keyof typeof formatData]
    if (resultData == null) {
        // null means there is no pack format applicable
        // undefined means this is a future version not yet known about by pack-format
        // pass both through as-is
        return resultData
    }
    return resultData[type]
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

    const matchingData = verData.filter(({ verData }) => verData?.[type] === format)
    const releases = matchingData.filter(({ version }) => isRelease(version))
    const devVers = matchingData.filter(({ version }) => isDevVer(version))
    output.releases.min = releases[0]?.version ?? null
    output.releases.max = releases[releases.length - 1]?.version ?? null
    output.snapshots.min = devVers[0]?.version ?? null
    output.snapshots.max = devVers[devVers.length - 1]?.version ?? null

    return output
}

getPackFormat.getPackFormat = getPackFormat
getPackFormat.getPackFormats = getPackFormats
getPackFormat.getVersions = getVersions
getPackFormat.LATEST = LATEST

export = getPackFormat
