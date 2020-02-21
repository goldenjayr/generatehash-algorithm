const util = require('util')

const projectData = require('./project')
const visitData = require('./visit')

function evaluate(obj) {
    return evaluateObject(obj).map(value => {
        if(Array.isArray(value)) {
            return evaluateArray(value)
        }

        if(typeof value === 'object') {
            return evaluate(value)
        }

        return value
    })
}


function evaluateObject(obj) {
    return Object.entries(obj).map(([key, value]) => typeof value === 'object' ? [key, value] : key).flat()
}
  

function evaluateArray(arr) {
    return arr.map(el => {
        return evaluate(el)
    }).flat()
}

console.log(util.inspect(evaluate(visitData), false, null, true))

// console.log(evaluateArray(exArray))