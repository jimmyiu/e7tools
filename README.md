# Vue.js Project Template

This is a **Vue.js** project template using Babel, typescript, router, Vuex, SASS and [Vuetify](https://vuetifyjs.com/).  The project make use of docker to setup the development environment. Useful commands can be found in `makefile`.
This project is optimized for Ubuntu + Docker.

## Quick Start

```
$ make node
$ yarn
$ yarn serve
```

http://localhost:8080/

## Start project

Assumed docker host IP is `192.168.5.1`, (you can change it in `vue.config.js`). This is needed if you want to add proxy to your local development API.

#### Visual Code Plugins
1. Eslint
1. Prettier
1. Vetur
1. vuetify-vscode

## Upgrade Dependencies

### Node

In makefile

```
NODE_IMAGE=node:12-alpine
```

[Official Node Docker Image](https://hub.docker.com/_/node/)

### Vue

```
$ make vue-cli
$ vue upgrade
$ yarn upgrade
```