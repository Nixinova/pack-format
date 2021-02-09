const packFormat = require('./')

let total = 0, passed = 0, failed = 0
const test = (input, expected) => {
    let ver = packFormat(input)
    let pass = ver == expected
    if (pass) passed++
    else failed++
    total++
    console.log(`${pass ? '+' : '-'} Pack format of ${input} is ${ver}`)
}

test('1.1', null)
test('1.6', 1)
test('1.9', 2)
test('1.16.1', 5)
test('1.16.3', 6)
test('1.16.2-pre1', 5)
test('1.30', null)
test('11w50a', null)
test('20w30a', 6)
test('99w99a', null)

console.log(`\nRan ${total} tests | ${passed} passed | ${failed} failed`)
