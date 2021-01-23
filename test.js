const packFormat = require('./')
const test = (ver, expected) =>
    console.log(`Pack format of ${ver} is ${packFormat(ver)} ${packFormat(ver) == expected ? '(pass)' : '(fail)'}`)

test('1.1', null)
test('1.9', 2)
test('1.16.1', 5)
test('1.16.3', 6)
test('1.16.2-pre1', 5)
test('1.30', null)
test('11w50a', null)
test('20w30a', 6)
test('99w99a', null)
