# Epic7 Online Tools

This tools is currently under development, and is temporarily hosted using the project [GitHub page](https://jimmyiu.github.io/e7tools/).<br />
I found a well developed Java based optimizer here: <https://github.com/fribbels/Fribbels-Epic-7-Optimizer>

## Development Notes

This project is optimized for Ubuntu + Docker. You can start the developement environment by:

```
$ make node
$ yarn
$ yarn serve
```

The application will be ready at <http://localhost:8080/>

### Visual Code Plugins

1. Eslint
1. Prettier
1. Vetur
1. vuetify-vscode

### Upgrade Dependencies

#### Node

```
# makefile
NODE_IMAGE=node:12-alpine
```

### Vue

```
$ make vue-cli
$ vue upgrade
$ yarn upgrade
```
