.SILENT:
.PHONY: build test

-include .env
-include ./.manala/Makefile

## Colors
COLOR_RESET   = \033[0m
COLOR_INFO    = \033[32m
COLOR_COMMENT = \033[33m

###########
# Install #
###########

## Install application
install:
	if [ ! -s  ".env" ]; then cat .env.dist >> .env; fi;
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
	rsync -arzv --progress --delete dist/ app@noel.elao.elao.local:/srv/app/current/
