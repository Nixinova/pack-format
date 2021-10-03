import { getPackFormat as packFormat, getVersions } from '../src/index'
import { PackType, FormatResult, VersionsResult } from '../src/types'

let [total, passed, failed]: number[] = [0, 0, 0]

function testPackFormat([input, type]: [string, PackType?], expected: FormatResult): void {
    let ver: FormatResult = packFormat(input, type)
    let pass: boolean = ver === expected
    if (pass) passed++
    else failed++
    total++
    console.log(
        (pass ? '  ' : '! ')
        + (type ? type[0].toUpperCase() + type.substr(1) + ' p' : 'P')
        + `ack format of ${input} is ${ver}`
        + (!pass ? ` (should be ${expected})` : '')
    )
}

function testVersions([input, type]: [number, PackType?], expected: VersionsResult) {
    let obj: VersionsResult = getVersions(input, type)
    let pass = obj.releases.max === expected.releases.max && obj.snapshots.min === expected.snapshots.min
    if (pass) passed++
    else failed++
    total++
    const cleanObj = (obj: VersionsResult) => JSON.stringify(obj).replace(/"([^"]*?)":/g, '$1:')
    console.log(
        (pass ? '  ' : '! ')
        + `Versions with ${type ? type + ' ' : ''}pack format ${input}: ${cleanObj(obj)}`
        + (!pass ? ` (should be ${cleanObj(expected)})` : '')
    )
}

testPackFormat([''], undefined)
testPackFormat(['invalid'], undefined)
testPackFormat(['1'], undefined)
testPackFormat(['1.1'], undefined)
testPackFormat(['1.6'], 1)
testPackFormat(['1.9'], 2)
testPackFormat(['1.16.1'], 5)
testPackFormat(['1.16.2-pre1'], 5)
testPackFormat(['1.16.2 pre1'], 5)
testPackFormat(['1.16.2 pre-release 1'], 5)
testPackFormat(['1.30'], undefined)
testPackFormat(['1.16.3'], 6)
testPackFormat(['1.18'], 8)
testPackFormat(['11w50a'], undefined)
testPackFormat(['13w23a'], undefined)
testPackFormat(['13w24a'], 1)
testPackFormat(['16w31a'], 2)
testPackFormat(['16w32a'], 3)
testPackFormat(['20w30a'], 5)
testPackFormat(['20w45a'], 7)
testPackFormat(['20w45a', 'resource'], 7)
testPackFormat(['20w45a', 'data'], 6)
testPackFormat(['20w46a', 'data'], 7)
testPackFormat(['21w37a'], 7)
testPackFormat(['21w37a', 'resource'], 7)
testPackFormat(['21w37a', 'data'], 8)
testPackFormat(['21w39a', 'resource'], 8)
testPackFormat(['combat3'], 4)
testPackFormat(['1.18-exp1'], 7)
testPackFormat(['1.18-es2'], 7)
testPackFormat(['1.18 experimental snapshot 3'], 7)

testVersions([3, 'data'], { releases: { min: '', max: '' }, snapshots: { min: '', max: '' } })
testVersions([6, 'resource'], { releases: { min: '1.16.x', max: '1.16.x' }, snapshots: { min: '', max: '' } })
testVersions([6, 'data'], { releases: { min: '1.16.x', max: '1.16.x' }, snapshots: { min: '20w45a', max: '20w45a' } })
testVersions([7, 'resource'], { releases: { min: '1.17.x', max: '1.17.x' }, snapshots: { min: '20w45a', max: '21w38a' } })

console.log(`\nRan ${total} tests | ${passed} passed | ${failed} failed`)
