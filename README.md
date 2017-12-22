# AsciiHub

AsciiHub simplifies all day work at ascii Dresden, featuring invoicer frontend and matemat.

[![travis](https://travis-ci.org/ascii-dresden/ascii-hub.svg?branch=master)](https://travis-ci.org/ascii-dresden/ascii-hub/)
[![dependency Status](https://david-dm.org/ascii-dresden/ascii-hub.svg)](https://david-dm.org/ascii-dresden/ascii-hub)
[![devDependency Status](https://david-dm.org/ascii-dresden/ascii-hub/dev-status.svg)](https://david-dm.org/ascii-dresden/ascii-hub?type=dev)

[![GitHub forks](https://img.shields.io/github/forks/ascii-dresden/ascii-hub.svg?style=social&label=Fork)](https://github.com/ascii-dresden/ascii-hub/fork)
[![GitHub stars](https://img.shields.io/github/stars/ascii-dresden/ascii-hub.svg?style=social&label=Star)](https://github.com/ascii-dresden/ascii-hub)

> Build with :heartpulse: in Dresden

## Features

- [asciii](https://github.com/ascii-dresden/asciii) frontend
- Dashboard with weather [forecast](#weather-forecast)
- i18n (en, [de](#i18n))

More great features will be implemented soon.

## Preparation

Install the dependencies.

```
npm install
``` 

Some settings are stored in `src/environments/settings.ts`. Simply rename `src/environments/settings.sample.ts`.

## Development server

For a dev server run

```
ng serve
```

To use the RESTful API from ascii invoicer you need to run a local instance of [rocket](https://github.com/SergioBenitez/Rocket).
Checkout asciii and switch to feature/server branch. Run

```
cargo --features server --example server
```

to setup a local server instance. Read the asciii documentation for more information.

### Weather forecast

The dashboard provides a weather forecast widget. 
Visit [darksky.net](https://darksky.net) to get your own free API Key and put in into the
`src/environments/settings.ts` file. In dev mode the app uses a mock service to prevent 
unnecessary HTTP requests onto the Dark Sky API. 

### i18n

To change your interface language to german run

```
npm run start:de
```

Change currency and locale by editing `src/environments/settings.ts`.

## License

MIT - [ascii Dresden](https://github.com/ascii-dresden)
