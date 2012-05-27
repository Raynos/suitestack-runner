var suitestack = require('suitestack')

reporter(suitestack)
require('suitestack-runner/test/integration/a.js')
require('suitestack-runner/test/integration/b.js')
require('suitestack-runner/test/integration/c.js')
function reporter(test) {
	var push = require("/push")

	test.on("error", function (err, name) {
		push('log', { message : 'fail!' })

		push('assert', {
            type : 'fail',
            ok : false,
            name : name,
            found : err.toString(),
            wanted : undefined
        })
	})

	test.on("pass", function (name) {
		push('log', { message : 'pass!' })
        
        push('assert', {
            type : 'ok',
            ok : true,
            name : name,
            found : undefined,
            wanted : undefined
        })
	})

	test.on('test', function () {
        push('log', { message : 'start!' })
    })
    
    test.on('test end', function () {
        push('log', { message : 'test end' })
        push('testEnd', {})
    })

    test.on("end", function () {
    	push("end", {})
    })
}