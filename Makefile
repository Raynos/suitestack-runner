test: 
	./node_modules/.bin/suitestack \
		--node mocha-Spec \
		--browsers ./browser.json \
		--testling ./testling.json \
		./test/integration/

testling:
	tar -cf- bin/fake.js node_modules | curl -sSNT- \
		-u raynos2@gmail.com:kamasha16 \
		-m 30 \
  		'testling.com/?main=bin/fake.js\&browsers=chrome/17.0\&noinstrument'

.PHONY: test testling