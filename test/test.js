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
        const parts = line.match(/^"(.*)" \((r|d|r,d|-)\) ([\w.]+(?:,[\w.]+)?)/)
        if (!parts)
            continue

        const getAns = ans => ans === 'none' ? undefined : ans === 'null' ? null : +ans
        const [, lineName, lineType, lineAns] = parts
        const input = lineName || "[blank]"
        const type = { 'r': 'resource', 'd': 'data', 'r,d': 'both', '-': undefined }[lineType]
        if (type === 'both') {
            // multiple: data AND resource
            const [resourceAns, dataAns] = lineAns.split(',')
            testPackFormat(input, 'resource', getAns(resourceAns))
            testPackFormat(input, 'data', getAns(dataAns))
        }
        else {
            // either data OR resource
            testPackFormat(input, type, getAns(lineAns))
        }
    }
}

testPackFormats()

testVersions([3, 'data'], { releases: { min: null, max: null }, snapshots: { min: null, max: null } })
testVersions([10, 'resource'], { releases: { min: null, max: null }, snapshots: { min: null, max: null } })
testVersions([6, 'resource'], { releases: { min: '1.16.2', max: '1.16.5' }, snapshots: { min: null, max: null } })
testVersions([6, 'data'], { releases: { min: '1.16.2', max: '1.16.5' }, snapshots: { min: '20w45a', max: '20w45a' } })
testVersions([7, 'resource'], { releases: { min: '1.17', max: '1.17.1' }, snapshots: { min: '20w45a', max: '21w38a' } })
testVersions([10, 'data'], { releases: { min: '1.19', max: '1.19.3' }, snapshots: { min: '22w11a', max: '23w02a' } })
testVersions([11, 'resource'], { releases: { min: null, max: null }, snapshots: { min: '22w42a', max: '22w44a' } })
testVersions([15, 'data'], { releases: { min: '1.20', max: '1.20.1' }, snapshots: { min: '23w18a', max: '23w30a' } })

console.log(`\nRan ${total} tests | ${passed} passed | ${failed} failed`)
