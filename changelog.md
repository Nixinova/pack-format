# Changelog

## 1.4.2
*2025-06-27*
- Fixed returned latest pack formats not checking release versions.
- Updated resource pack format to `64`.
- Updated data pack format to `81`.

## 1.4.1
*2025-01-27*
- Changed future minor releases to have undefined pack formats instead of having earlier releases' formats fall through.
- Updated resource pack format to `49`.
- Updated data pack format to `64`.

## 1.4.0
*2024-11-03*
- Added `release` and `snapshot` to exported object `LATEST` which denotes the latest known released versions.
- Changed output of `getVersions` to return `null` instead of `''` when a version is not present.
- Changed output of `getVersions` to replace '`.x`' with the actual game version.
- Changed CLI output of `--list` to present the versions in prose instead of JSON.
- Changed CLI output to display a basic message when no arguments are given.
- Changed CLI help message.
- Updated resource pack format to `43`.
- Updated data pack format to `58`.

## 1.3.16
*2024-08-24*
- Updated resource pack format to `36`.
- Updated data pack format to `50`.
- Fixed special case checking not being applied to full version names leading to no result for certain versions.

## 1.3.15
*2024-05-12*
- Updated resource pack format to `32`.
- Updated data pack format to `42`.

## 1.3.14
*2024-04-15*
- Updated resource pack format to `31`.
- Updated data pack format to `39`.
- Fixed data pack format for 24w12a and 24w13a.

## 1.3.13
*2024-03-15*
- Changed the CLI result to say 'not present' instead of 'not known' for versions that do not use a pack format.
- Updated resource pack format to `28`.
- Updated data pack format to `35`.

## 1.3.12
*2024-01-23*
- Changed the CLI result to say 'not known' instead of 'undefined' for versions without associated pack formats.
- Fixed the result of `--latest` not always returning the very latest version.
- Updated resource pack format to `24`.
- Updated data pack format to `28`.

## 1.3.11
*2024-01-03*
- Fixed incorrect maximum versions being returned in the output of `--list`.
- Fixed snapshots being incorrectly formatted in the output of `--list`.

## 1.3.10
*2024-01-01*
- Updated resource and data pack formats to `18`.

## 1.3.9
*2023-08-10*
- Changed the CLI output to display both resource and data pack formats on separate lines when no type is specified.
- Updated resource and data pack formats to `17`.

## 1.3.8
*2023-08-06*
- Fixed latest pack format being outdated.
- Updated resource and data pack formats to `16`.

## 1.3.7
*2023-06-11*
- Updated pack format data to 1.20.

## 1.3.6
*2023-04-28*
- Updated data pack format to `14`.
- Updated resource pack format to `15`.

## 1.3.5
*2023-04-06*
- Updated data pack format to `13`.
- Updated resource pack format to `14`.

## 1.3.4
*2022-11-13*
- Fixed `--list` CLI option not working.
- Updated pack format data to 1.19.3.

## 1.3.3
*2022-06-13*
- Added an error message when using `--list` without providing a pack format.
- Changed CLI arguments to be parsed in a more intuitive order.
- Updated pack format data to 1.19.

## 1.3.2
*2022-03-17*
- Changed `--latest` output to display both resource and data pack formats instead of just the highest one.
- Changed `--list` output to have an explanatory header line.
- Updated resource pack format to `9`.
- Updated data pack format to `10`.

## 1.3.1
*2022-02-19*
- Fixed a crash occurring when malformed snapshot versions are inputted.
- Fixed snapshot versions not returning results when the final letter is missing.
- Updated data pack format to `9`.

## 1.3.0
*2021-10-05*
- Added function `getPackFormats(version: string): object` to retrieve both the resource and data pack formats of a given version.
- Changed the default CLI command to show both pack formats if the type is unspecified instead of defaulting to the resource pack format.

## 1.2.8
*2021-10-03*
- Changed CLI arguments `--help` and `--version` to override other arguments.
- Fixed CLI argument `--version` not returning the current version.
- Fixed command-line usage not working.

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
