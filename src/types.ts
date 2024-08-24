export type VersionName = `1.${number}.${number | 'x'}`
export type SnapshotName = `${number}w${number}${'a' | 'b' | 'c' | 'd' | 'e'}`

export type PackType = 'resource' | 'data'
export type PackMap = Record<PackType, FormatResult>

export type FormatResult = number | null | undefined

export interface VersionsResult {
    releases: { min: VersionName | '', max: VersionName | '' },
    snapshots: { min: SnapshotName | '', max: SnapshotName | '' },
}
