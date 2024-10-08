export type VersionName = `1.${number}` | `1.${number}.${number | 'x'}`
export type SnapshotName = `${number}w${string}${Lowercase<string>}`

export type PackType = 'resource' | 'data'
export type PackMap = Record<PackType, FormatResult>

export type FormatResult = number | null | undefined

export interface VersionsResult {
    releases: { min: VersionName | null, max: VersionName | null },
    snapshots: { min: SnapshotName | null, max: SnapshotName | null },
}
