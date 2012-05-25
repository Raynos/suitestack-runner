var mocha = require("./lib/mocha"),
    extend = require("xtend"),
    bindAll = require("bindAll"),
    EventEmitter = require("events").EventEmitter.prototype

 /*
 *   - `start`  execution started
 *   - `end`  execution complete
 *   - `suite`  (suite) test suite execution started
 *   - `suite end`  (suite) all tests (and sub-suites) have finished
 *   - `test`  (test) test execution started
 *   - `test end`  (test) test completed
 *   - `hook`  (hook) hook execution started
 *   - `hook end`  (hook) hook complete
 *   - `pass`  (test) test passed
 *   - `fail`  (test, err) test failed
 */


extend(Reporter, EventEmitter, {
    start: function (test) {
        this.emit("start")
        this.test = test

        test.on("test", this.testStart)
        test.on("end", this.end)
        test.on("test end", this.testEnd)
        test.on("pass", this.testPass)
        test.on("error", this.testFail)
    },
    end: function () {
        var test = this.test

        test.removeListener("test", this.testStart)
        test.removeListener("end", this.end)
        test.removeListener("test end", this.testEnd)
        test.removeListener("pass", this.testPass)
        test.removeListener("error", this.testFail)

        this.emit("end")
    },
    testStart: function (name, node) {
        //console.log("testStarted", name, node)
        this.suite = {
            name: name,
            node: node
        }
    },
    testEnd: function (name) {
        //console.log("ending", name, this.suiteBuffer, this.openSuites)
        if (this.suite.type === "test") {
            this.emit("test end", extend(this._createTest(this.suite.name), {
                state: this.suite.state,
                err: this.suite.err,
                fn: this.suite.node.block
            }))
            this.total++
            this._checkAndEndSuite()
        }
    },
    testPass: function (name) {
        //console.log("testPass runSuite", name)
        var type = this._runSuite()

        if (type === "test") {
            this.suite.state = "passed"
            //console.log("test passed", name)
            this.emit("pass", this._createTest(name))    
        }
    },
    testFail: function (err, name) {
        //console.log("testFail runSuite", err, err.stack)
        var type = this._runSuite()
        //console.log("failed", name, type)

        if (type === "test") {
            this.suite.err = err
            //console.log("test failed", err)
            this.emit("fail", this._createTest(name), err)    
        }
    },
    _runSuite: function () {
        //console.log("running suite", this.suite.name)
        if (this.suite.node.nodes.length) {
            this.emit("suite", this._createSuite(this.suite.name))
            this.suite.type = "suite"
        } else {      
            this.emit("test", this._createTest(this.suite.name))
            this.suite.type = "test"
        }
        return this.suite.type
    },
    _checkAndEndSuite: function (node) {
        node = node || this.suite.node
        var parent = node.parent

        if (parent === undefined) {
            return
        }

        if (parent.nodes.indexOf(node) === parent.nodes.length - 1) {
            this.emit("suite end", 
                this._createSuite(parent.testName, parent))
            this._checkAndEndSuite(parent)
        }
    },
    _parentSuite: function (node) {
        //console.log("found parent", node)
        var parent = node.parent

        if (parent === undefined || !parent.testName) {
            return
        } else {
            return this._createSuite(parent.testName, parent)
        }
    },
    _createSuite: function (name, node) {
        //console.log("name suite", name)
        if (!node) {
            node = this.suite.node
        }

        return extend({
            title: name,
            parent: this._parentSuite(node)
        }, Test)
    },
    _createTest: function (name) {
        return extend({
            title: name,
            parent: this._parentSuite(this.suite.node)
        }, Test)
    }
})

var Test = {
    fullTitle: function () {
        var title = ""
        if (this.parent) {
            title += this.parent.fullTitle() + " "
        }
        title += this.title
        return title
    }
}

module.exports = Reporter

function Reporter(name, test) {
    var reporter = bindAll({}, Reporter, {
        total: 0
    })

    if (name.indexOf("mocha-") === 0) {
        name = name.substr(6)

        var MochaReporter = mocha.reporters[name]

        new MochaReporter(reporter)
    }

    reporter.start(test)

    return reporter
}