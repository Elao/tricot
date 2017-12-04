.SILENT:
.PHONY: build test

## Colors
COLOR_RESET   = \033[0m
COLOR_INFO    = \033[32m
COLOR_COMMENT = \033[33m

## Help
help:
	printf "${COLOR_COMMENT}Usage:${COLOR_RESET}\n"
	printf " make [target]\n\n"
	printf "${COLOR_COMMENT}Available targets:${COLOR_RESET}\n"
	awk '/^[a-zA-Z\-\_0-9\.@]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf " ${COLOR_INFO}%-16s${COLOR_RESET} %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)

###########
# Install #
###########

## Install application
install:
	npm install

## Lint
lint:
	./node_modules/.bin/eslint index.js src

#########
# Build #
#########

## Start the dev server and watch for change
start:
	./node_modules/.bin/webpack-dev-server --open --progress --colors --compress --host 0.0.0.0

## Build application and watch for changes
watch:
	./node_modules/.bin/webpack --progress --colors --watch

## Build application
build: export NODE_ENV = production
build:
	rm -rf dist/*
	./node_modules/.bin/webpack

## Start a local server
serve:
	php -S 0.0.0.0:8000 -t ./dist

##########
# Deploy #
##########

deploy: build
	rsync -arzv --delete dist/* app@noel.elao.elao.local:/srv/app/current
