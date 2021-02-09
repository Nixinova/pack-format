# Changelog

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
