const fs = require("fs")

function log_request_response_middleware(filename) {
    return (req, res, next) => {
        fs.appendFile(
            filename,
            `\n ${new Date().toLocaleString('en-IN')}: ${req.ip} ${req.method}: ${req.path}\n`,
            (err, data) => {
                next()
            }
        )
    }

}
module.exports = {
    log_request_response_middleware
}