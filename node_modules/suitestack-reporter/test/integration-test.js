var test = require("suitestack"),
    reporter = require("suitestack-reporter"),
    assert = require("assert")

reporter("mocha-Spec", test)

test("async tests work", function (_, done) {
    setTimeout(function () {
        done()
    }, 500)
})

test("flat", function () {
    assert(true)
})

test("also works", function () {
    assert(true)
})

test("also can fail", function () {
    assert(false, "it does indeed fail")
})

test("buffered async", function (test, done) {
    test("can test inside", function () {
        assert(true)
    })

    test("can test further inside", function (test) {
        test("so deep", function () {
            assert(true)
        })
    })

    test("can fail inside", function () {
        assert(false, "failure in async test")
    })

    setTimeout(function () {
        done()
    }, 500)
})

test("test", function (test) {
    test("test suite creates a suite", function () {
        assert(true, "should not raise error")
    })

    test("test suite can fail", function () {
        assert(false, "fails correctly")
    })
})

test("test supports", function (test) {
    test("nesting tests", function (test) {
        test("with dummy tests", function () {
            assert(true, "should be true")
        })
    })
})

test("lulz", function (test) {
    test("should be lulz", function () {
        assert(false, "it was not lulz")
    })
})