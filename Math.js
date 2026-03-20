// all math functions in one file

function addition(a, b){
    return a + b
}

function subtraction(a, b){
    return a - b
}

function multiplication(a, b){
    return a * b
}

// correct export
module.exports = {
    add: addition,
    sub: subtraction,
    mul: multiplication
}