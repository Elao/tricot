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

#########
# Build #
#########

watch-js:
	echo "TODO"

watch-css:
	echo "Watching..."
	./node_modules/.bin/node-sass -w -r --source-map true --source-map-contents --output-style compressed style/main.scss style.css

## Build application
build: export NODE_ENV = production
build: build-css build-js

build-js:
	echo "TODO"

build-css:
	./node_modules/.bin/node-sass -x --output-style compressed style/main.scss style.css
