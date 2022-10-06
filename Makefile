publish:
	npm i && npm version patch && make build && npm publish --access public

build:
	npx tsc

setup:
	npm i
