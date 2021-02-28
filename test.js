const packFormat = require('./')

let total = 0, passed = 0, failed = 0
const test = ([input, type], expected) => {
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

test([null], null)
test(['invalid'], null)
test(['1'], null)
test(['1.1'], null)
test(['1.6'], 1)
test(['1.9'], 2)
test(['1.16.1'], 5)
test(['1.16.2-pre1'], 5)
test(['1.16.2 pre1'], 5)
test(['1.16.2 pre-release 1'], 5)
test(['1.30'], null)
test(['1.16.3'], 6)
test(['11w50a'], null)
test(['13w23a'], null)
test(['13w24a'], 1)
test(['16w31a'], 2)
test(['16w32a'], 3)
test(['20w30a'], 5)
test(['20w45a'], 7)
test(['20w45a', 'resource'], 7)
test(['20w45a', 'data'], 6)
test(['20w46a', 'data'], 7)

console.log(`\nRan ${total} tests | ${passed} passed | ${failed} failed`)
