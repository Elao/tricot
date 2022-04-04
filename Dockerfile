ARG DEBIAN=bullseye

FROM debian:${DEBIAN}-slim

ARG DEBIAN
ARG USER_ID=1000
ARG GROUP_ID=1000
ARG GOSU_VERSION=1.12
ARG GOMPLATE_VERSION=3.9.0
ARG NODE_VERSION=8
ARG NGINX_VERSION=1.22
ARG PHP_VERSION=8.1
ARG COMPOSER_VERSION=2

COPY . /srv/app
WORKDIR /srv/app

# Expose some environment variables
ENV \
    PHP_VERSION=${PHP_VERSION}

RUN \
    apt-get update \
    && apt-get install -y --no-install-recommends \
        apt-transport-https \
        sudo \
        curl \
        ca-certificates \
        gnupg \
        unzip \
    # Sudo
    && echo "Defaults !env_reset" > /etc/sudoers.d/env \
    # User
    && addgroup --gid ${GROUP_ID} app \
    && adduser --home /home/app --shell /bin/bash --uid ${USER_ID} --gecos app --ingroup app --disabled-password app \
    && echo "app ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/app \
    # App dir
    && mkdir --parents /srv/app && chown app:app /srv/app \
    # App entrypoint dir
    && mkdir --parents /srv/entrypoint.d && chown app:app /srv/entrypoint.d \
    # Gosu
    && curl -sSL https://github.com/tianon/gosu/releases/download/${GOSU_VERSION}/gosu-amd64 \
        -o /usr/local/bin/gosu \
    && chmod +x /usr/local/bin/gosu \
    # Gomplate
    && curl -sSL https://github.com/hairyhenderson/gomplate/releases/download/v${GOMPLATE_VERSION}/gomplate_linux-amd64 \
        -o /usr/local/bin/gomplate \
    && chmod +x /usr/local/bin/gomplate \
    \
    #########
    # Nginx #
    #########
    \
    && echo "deb http://nginx.org/packages/debian/ ${DEBIAN} nginx" > /etc/apt/sources.list.d/nginx.list \
    && curl -sSL http://nginx.org/keys/nginx_signing.key \
        | apt-key add - \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        nginx=${NGINX_VERSION}.* \
    \
    ########
    # Node #
    ########
    \
    && echo "deb https://deb.nodesource.com/node_${NODE_VERSION}.x ${DEBIAN} main" > /etc/apt/sources.list.d/node.list \
    && curl -sSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key \
        | apt-key add - \
    && echo "Package: nodejs*\n\
Pin: origin deb.nodesource.com\n\
Pin-Priority: 900" > /etc/apt/preferences.d/node \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        nodejs \
    \
    #######
    # Php #
    #######
    \
    && echo "deb https://packages.sury.org/php/ ${DEBIAN} main" > /etc/apt/sources.list.d/php.list \
    && curl -sSL https://packages.sury.org/php/apt.gpg --output /etc/apt/trusted.gpg.d/php.gpg \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        php${PHP_VERSION}-cli \
        php${PHP_VERSION}-fpm \
        php${PHP_VERSION}-opcache \
        php${PHP_VERSION}-readline \
    # Modules
    && phpdismod \
        xdebug \
    # Composer
    && curl -sSL https://getcomposer.org/installer \
        | php -- --install-dir /usr/local/bin --filename composer --${COMPOSER_VERSION} \
    \
    #########
    # Clean #
    #########
    \
    && rm -rf \
        /var/lib/apt/lists/* \
        /var/cache/debconf/*-old \
        /var/lib/dpkg/*-old \
    && truncate -s 0 /var/log/*.log

RUN npm install
RUN /srv/app/node_modules/.bin/webpack
