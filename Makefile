test:
	npx eslint --color --quiet *.js

publish:
	git push -u --tags origin master
	npm publish

update:
	npx updates -cu
	rm -rf node_modules
	npm i --no-package-lock
	rm -rf node_modules/dtrace-provider

npm-patch:
	npm version patch

npm-minor:
	npm version minor

npm-major:
	npm version major

patch: test npm-patch publish
minor: test npm-minor publish
major: test npm-major publish

.PHONY: test publish update patch minor major npm-patch npm-minor npm-major
