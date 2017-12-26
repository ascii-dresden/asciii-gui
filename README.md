# AsciiHub

Simplifies all day work at ascii Dresden, featuring ascii invoicer 3.x frontend and matemat.
AsciiHub is built with [Angular 5](https://angular.io).

[![travis](https://travis-ci.org/ascii-dresden/ascii-hub.svg?branch=master)](https://travis-ci.org/ascii-dresden/ascii-hub/)
[![dependency Status](https://david-dm.org/ascii-dresden/ascii-hub.svg)](https://david-dm.org/ascii-dresden/ascii-hub)
[![devDependency Status](https://david-dm.org/ascii-dresden/ascii-hub/dev-status.svg)](https://david-dm.org/ascii-dresden/ascii-hub?type=dev)

[![GitHub forks](https://img.shields.io/github/forks/ascii-dresden/ascii-hub.svg?style=social&label=Fork)](https://github.com/ascii-dresden/ascii-hub/fork)
[![GitHub stars](https://img.shields.io/github/stars/ascii-dresden/ascii-hub.svg?style=social&label=Star)](https://github.com/ascii-dresden/ascii-hub)

> Build with :heart: in Dresden

:construction: Checkout the [dev](https://github.com/ascii-dresden/ascii-hub/tree/dev) branch to the latest features an bugs. :construction:

## Features

- [ascii invoicer 3.x](https://github.com/ascii-dresden/asciii) frontend
- Dashboard with [weather forecast](#weather-forecast)
- Official Angular i18n support (en, [de](#i18n))

More great features will be implemented soon.

## Preparation

Install the dependencies.

```
npm install
``` 

Some settings are stored in `src/environments/config.ts`. Simply copy `src/environments/config.sample.ts`.

## Development server

For a dev server run

```
ng serve
```

To use the RESTful API from ascii invoicer you need to run a local instance of [rocket](https://github.com/SergioBenitez/Rocket). Checkout the asciii project and switch to [feature/server](https://github.com/ascii-dresden/asciii/tree/feature/server) branch. Run

```
cargo run --example server --features server
```

to setup a local server instance. Read the asciii documentation for more information.

Since rocket runs on port 8000 by default, your browser will block Cross-Origin request. You'll have to allow
Cross-Origin requests to use the asciii REST API.

### Weather forecast

The dashboard provides a weather forecast widget. Visit [darksky.net](https://darksky.net) to get your own 
free API Key and put in into the `src/environments/config.ts` file. In dev mode the app uses a mock 
service to prevent unnecessary HTTP requests onto the Dark Sky API. 

### i18n

To change your interface language to german run

```
npm run start:de
```

Change currency and locale by editing `src/environments/config.ts`.

## License

MIT - [ascii Dresden](https://github.com/ascii-dresden)
