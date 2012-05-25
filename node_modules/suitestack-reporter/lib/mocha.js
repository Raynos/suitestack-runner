if (process.title === "node") {
    module.exports = (require)("mocha")
} else {
    module.exports = {
        reporters: {
            HTML: require("mocha/lib/reporters/html")
        }
    }
}