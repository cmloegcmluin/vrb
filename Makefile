publish:
	npm i && npm version patch && npm run build && npm publish --access public

build:
	npm build
