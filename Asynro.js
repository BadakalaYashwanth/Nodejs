const fs = require('fs')

console.log("1")

fs.readFile('AsyncMethodCopiedVersion.txt', 'utf-8', (err, result) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(result)
})

console.log("2")