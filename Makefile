test: 
	./node_modules/.bin/suitestack \
		--node mocha-Spec \
		--firefox \
		./test/integration/

firefox:
	firefox ./bin/index.html

.PHONY: test firefox