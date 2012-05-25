# suitestack-runner

A CLI utility to run suitestack tests

## Example

    ./node_modules/.bin/suitestack-runner \
        --node-reporter mocha-Spec \
        --zombie-reporter mocha-Spec \
        --testling-browsers firefox9.0, chrome17.0 \
        --browsers firefox, chrome \
        ./test/

