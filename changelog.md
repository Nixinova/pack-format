# Changelog

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
