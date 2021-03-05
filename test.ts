import { getPackFormat as packFormat, getVersions } from './index'
import { packType, formatResult, versionsResult } from './types'

let total = 0, passed = 0, failed = 0

function testPackFormat([input, type]: [string, packType?], expected: formatResult): void {
    let ver = packFormat(input, type)
    let pass = ver == expected
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

function testVersions([input, type]: [number, packType?], expected: versionsResult) {
    let obj = getVersions(input, type)
    let pass = obj.releases.max === expected.releases.max && obj.snapshots.min === expected.snapshots.min
    if (pass) passed++
    else failed++
    total++
    const cleanObj = (obj: versionsResult) => JSON.stringify(obj).replace(/"(?!")/g, '')
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

testVersions([3, 'data'], { releases: { min: '', max: '' }, snapshots: { min: '', max: '' } })
testVersions([6, 'resource'], { releases: { min: '1.16.x', max: '1.16.x' }, snapshots: { min: '', max: '' } })
testVersions([7], { releases: { min: '1.17.x', max: '1.17.x' }, snapshots: { min: '20w45a', max: '21w14a' } })

console.log(`\nRan ${total} tests | ${passed} passed | ${failed} failed`)
