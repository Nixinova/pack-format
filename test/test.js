const fs = require('fs')
const path = require('path')
const { getPackFormat: packFormat, getVersions } = require('../dist/index')

let [total, passed, failed] = [0, 0, 0]

function testPackFormat(input, type, expected) {
    const ver = packFormat(input, type)
    const pass = ver === expected
    if (pass) passed++
    else failed++
    total++
    console.log(
        (pass ? '  ' : '! ')
        + `The ${type ? type + ' ' : ''}pack format of '${input}' is ${ver}`
        + (!pass ? ` (should be ${expected})` : '')
    )
}

function testVersions([input, type], expected) {
    const obj = getVersions(input, type)
    let pass = obj.releases.max === expected.releases.max && obj.snapshots.min === expected.snapshots.min
    if (pass) passed++
    else failed++
    total++
    const cleanObj = (obj) => JSON.stringify(obj).replace(/"([^"]*?)":/g, '$1:')
    console.log(
        (pass ? '  ' : '! ')
        + `Versions with ${type ? type + ' ' : ''}pack format ${input}: ${cleanObj(obj)}`
        + (!pass ? ` (should be ${cleanObj(expected)})` : '')
    )
}

function testPackFormats() {
    const formatsTests = fs.readFileSync(path.join(__dirname, 'pack-formats-tests.txt'), { 'encoding': 'utf-8' })
    for (const line of formatsTests.split('\n')) {
        const parts = line.match(/^"(.*)" \((.)\) (\w+)/)
        if (!parts)
            continue

        const input = parts[1] || "[blank]"
        const type = { 'r': 'resource', 'd': 'data', '-': undefined }[parts[2]]
        const result = parts[3] === 'none' ? undefined : parts[3] === 'null' ? null : +parts[3]
        testPackFormat(input, type, result)
    }
}

testPackFormats()

testVersions([3, 'data'], { releases: { min: '', max: '' }, snapshots: { min: '', max: '' } })
testVersions([10, 'resource'], { releases: { min: '', max: '' }, snapshots: { min: '', max: '' } })
testVersions([6, 'resource'], { releases: { min: '1.16.x', max: '1.16.x' }, snapshots: { min: '', max: '' } })
testVersions([6, 'data'], { releases: { min: '1.16.x', max: '1.16.x' }, snapshots: { min: '20w45a', max: '20w45a' } })
testVersions([7, 'resource'], { releases: { min: '1.17.x', max: '1.17.x' }, snapshots: { min: '20w45a', max: '21w38a' } })
testVersions([10, 'data'], { releases: { min: '1.19.x', max: '1.19.3' }, snapshots: { min: '22w11a', max: '23w02a' } })
testVersions([11, 'resource'], { releases: { min: '', max: '' }, snapshots: { min: '22w42a', max: '22w44a' } })
testVersions([15, 'data'], { releases: { min: '1.20.x', max: '1.20.1' }, snapshots: { min: '23w18a', max: '23w30a' } })

console.log(`\nRan ${total} tests | ${passed} passed | ${failed} failed`)
