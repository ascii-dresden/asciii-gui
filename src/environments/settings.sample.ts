// Usage: Copy this file to ./settings.ts and set your favourite settings
// Do not use this file.

export const settings = {
  os: 'linux', // Choose between 'linux' and 'windows' - only for dev purposes
  language: 'de',
  currencyCode: 'EUR', // May be 'EUR', 'USD'
  modules: ['ascii-invoicer', 'ascii-matemat'], // String list of module root component selectors
  forecastIo: { // Visit https://darksky.net/dev/docs for more information
    apiKey: '[your api key]',
    location: { // Dresden <3
      latitude: '51.05',
      longitude: '13.737'
    },
    params: {
      exclude: ['minutely', 'hourly', 'daily', 'alerts', 'flags'],
      lang: 'de',
      units: 'si'
    }
  }
};
