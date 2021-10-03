# Changelog

## 1.2.7
*2021-10-03*
- Fixed snapshots appearing malformed when using `getVersions()`.
- Fixed incorrect maximum snapshot data being listed when using `getVersions()`.
- Updated resource pack format to `8`.

## 1.2.6
*2021-09-23*
- Fixed `getVersions()` returning invalid snapshots.
- Fixed 1.18 snapshot resource pack versions being `8` instead of `7`.

## 1.2.5
*2021-09-16*
- Fixed CLI usage not working.

## 1.2.4
*2021-09-16*
- Updated `LATEST` pack formats to `8`.
- Changed CLI argument parsing to no longer require a fixed argument order.

## 1.2.3
*2021-09-16*
- Updated to support 1.18 snapshots.

## 1.2.2
*2021-07-23*
- Added support for Combat Test snapshots.
- Updated to support 1.18 experimental snapshots.

## 1.2.1
*2021-04-06*
- Added constant `LATEST` which returns the latest `pack_format` for both resource and data pack formats.
- Added type definitions to package.
- Fixed the automatically-generated current snapshot not working for single-digit weeks.
- Fixed `getVersions()` sometimes returning invalid maximum versions.
- Fixed `getVersions()` crashing when given a future pack version.

## 1.2.0
*2021-03-06*
- Added function `getVersions(pack_format: number, type?: string): object` to retrieve a list of versions that have the specified pack_format.
- Added CLI implementation of `getVersions`, `pack-format --list [--data|--version] <pack_format>`.
- Fixed data pack format always returning `undefined`.

## 1.1.3
*2021-03-04*
- Changed output to return `undefined` for future snapshots.
- Fixed data versions before `4` being returned when they should be `undefined`.
- Refactored code into TypeScript.

## 1.1.2
*2021-02-28*
- Changed coercing of version input to be more lenient.
- Fixed major releases returning the pack format of their last minor release.

## 1.1.1
*2021-02-13*
- Fixed command-line usage not parsing pre-release and release candidate versions.

## 1.1.0
*2021-02-13*
- Added argument `type` to Node usage; valid values are `'data'` and `'resource'` for retrieving the respective pack format for certain versions.
- Added command-line flags `--data` (alias `-d`/`d`) and `--resource` (alias `-r`/`r`) to implement the above `type` usage.
- Removed speculative hardcoded end of the current pack format.

## 1.0.6
*2021-02-09*
- Fixed pack format ranges being exclusive.

## 1.0.5
*2021-02-09*
- Added flag aliases `h` and `v` for `--help` and `--version` respectively.
- Fixed a crash occurring when retrieving a pack format via the command-line.

## 1.0.4
*2021-02-09*
- Fixed command-line usage not working.

## 1.0.3
*2021-02-09*
- Added a help message, given by using `pack-format` without any arguments or by using flag `--help`/`-h`.
- Refactored command-line code and tests.

## 1.0.2
*2021-01-23*
- Fixed the command-line tool overflowing into dependents.
- Fixed a crash occurring when using flag `--version`/`-v`.

## 1.0.1
*2021-01-23*
- Fixed command-line usage not working.
- Fixed a crash occurring when attempting to pass a raw number into the function.

## 1.0.0
*2021-01-23*
- Initial release with support for both full versions and snapshots.
