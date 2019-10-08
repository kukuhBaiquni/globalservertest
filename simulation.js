const moment = require('moment');

let lastMonthPattern = [
    1567495200000,
    1567768800000,
    1568086920000,
    1568448120000,
    1568773980000,
    1569196440000,
    1569564660000,
]; // length => 8

function differences(arr) {
    let result = [];
    let kampret = [...lastMonthPattern];
    let reversed = kampret.reverse();
    for (let i = 0; i < reversed.length; i++) {
        if (i !== 0) {
            result.push(reversed[i-1] - reversed[i])
        }
    }
    return result;
}
function average(arr) {
    let result = arr.reduce((x, y) => x + y) / arr.length;
    return result;
}

let difference = differences(lastMonthPattern);
let avg = average(difference);

function nextPattern(avg) {
    let result = [];
    let test = [];
    let lastIndex = lastMonthPattern[lastMonthPattern.length - 1];
    for (let i = 0; i < lastMonthPattern.length; i++) {
        lastIndex += avg;
        result.push(moment(lastIndex).format('DD-MMM-YYYY HH:mm'))
        test.push(lastIndex)
    }
    console.log(test)
    return result;
}
let final = nextPattern(avg);
console.log(final)
