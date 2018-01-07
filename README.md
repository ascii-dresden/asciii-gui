# asciii GUI

... provides an alternative to the CLI of [asciii](https://github.com/ascii-dresden/asciii). The project helps our 
members to evaluate and review our projects, clients, offers and clients.

asciii GUI is built with [Angular 5](https://angular.io) and was inspired by [InvoicePlane](https://github.com/InvoicePlane/InvoicePlane).

[![travis](https://travis-ci.org/ascii-dresden/asciii-gui.svg?branch=master)](https://travis-ci.org/ascii-dresden/asciii-gui/)
[![dependency Status](https://david-dm.org/ascii-dresden/asciii-gui.svg)](https://david-dm.org/ascii-dresden/asciii-gui)
[![devDependency Status](https://david-dm.org/ascii-dresden/asciii-gui/dev-status.svg)](https://david-dm.org/ascii-dresden/asciii-gui?type=dev)

[![GitHub forks](https://img.shields.io/github/forks/ascii-dresden/asciii-gui.svg?style=social&label=Fork)](https://github.com/ascii-dresden/asciii-gui/fork)
[![GitHub stars](https://img.shields.io/github/stars/ascii-dresden/asciii-gui.svg?style=social&label=Star)](https://github.com/ascii-dresden/asciii-gui)

> Built with :heart: in Dresden

## Setup

In order to build the project, you'll need NodeJS and NPM.

Install the dependencies.

```sh
$ npm install
``` 

### Development

For a dev server run

```sh
$ npm run start
```

To use the RESTful API from asciii you need to run a local instance of [rocket](https://github.com/SergioBenitez/Rocket). Checkout the asciii project and switch to [feature/server](https://github.com/ascii-dresden/asciii/tree/feature/server) branch. Run

```
$ cargo run --example server --features server
```

to setup a local server instance. Read the asciii documentation for more information.

Since rocket runs on port 8000 by default, your browser will block Cross-Origin request. You'll have to allow
Cross-Origin requests to use the asciii REST API.

#### i18n

To change your interface language to german run

```
$ npm run start:de
```

Change currency and locale by editing `src/environments/environment.ts`.

### Production

1. Dowload the latest release from the [release](https://github.com/ascii-dresden/asciii-gui/releases/latest) section
2. Extract the package and copy all files to your webserver or destination machine
3. Start the asciii server as described [here](#dev)
4. Start the asciii GUI.

```sh
$ chmod +x ./bin/www
$ ./bin/www
```

## License

MIT - [ascii Dresden](https://github.com/ascii-dresden) - :heart:
