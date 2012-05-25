test: 
	node ./test/integration-test.js

mocha-test: 
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--ui tdd \
		--reporter spec \
		./mocha-suite.js

build-browser:
	./node_modules/.bin/browserify ./test/browser-test.js -o ./test/bundle.js

browser:
	firefox ./test/index.html

.PHONY: test mocha-test browser build-browser