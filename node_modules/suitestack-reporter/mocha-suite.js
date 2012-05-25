var assert = require("assert")

test("async tests work", function (done) {
    setTimeout(function () {
        done()
    }, 500)
})

suite("buffered async", function () {
    suiteSetup(function (done) {
        setTimeout(function () {
            done()
        }, 500)
    })

    test("can test inside", function () {
        assert(true)
    })

    suite("can test further inside", function () {
        test("so deep", function () {
            assert(true)
        })
    })

    test("can fail inside", function () {
        assert(false, "failure in async test")
    })
})

suite("test", function () {
    test("test suite creates a suite", function () {
        assert(true, "should not raise error")
    })

    test("test suite can fail", function () {
        assert(false, "fails correctly")
    })
})

suite("test supports", function () {
    suite("nesting tests", function () {
        test("with dummy tests", function () {
            assert(true, "should be true")
        })
    })
})

suite("lulz", function () {
    test("should be lulz", function () {
        assert(false, "it was not lulz")
    })
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