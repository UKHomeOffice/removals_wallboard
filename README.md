# Removals Wallboard

[![Build](https://travis-ci.org/UKHomeOffice/removals_wallboard.png)](https://travis-ci.org/UKHomeOffice/removals_wallboard)

## Quickstart:

 Get [NodeJS](https://nodejs.org) via [nvm](https://github.com/creationix/nvm)
```sh
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
```

#### Install NodeJS 4 LTS
```sh
$ nvm install 4
$ nvm use 4
```
### Build:
```sh
$ npm install
```
### Test:
```sh
$ npm test
```
### CI Test:
```sh
$ npm test
```
### Start development service using localhost keycloak and localhost backend
```sh
$ npm start
```
### Build service to localhost
```sh
$ npm run build
```
## Environment variables

| VAR | OPTION | RESULT |
| --- | ------ | ------ |
| BACKEND | [string] | backend to use |
| KEYCLOAKURL | [string] | keycloak login url |
| CLIENTID | [string] | keycloak client id |
| KEYCLOAKACCOUNTSERVICE | [string] | url to use for managing the user's keycloak account |
| PORT | [integer] | port to run nginx server on |

## Docker
Can be built and run in the same way with docker for example:
```sh
$ docker build -t ibm-frontend .
$ docker run -i -e "BACKEND=localhost:8000" ibm-frontend
```
