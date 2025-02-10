rm -r .maestro/tests

all='**/*.yaml'
files="${1:-$all}"
maestro test --debug-output . -e APP_ID=com.dlyfoung.ebinder $files