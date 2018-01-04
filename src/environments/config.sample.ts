// Usage: Copy this file to ./settings.ts and set your favourite settings
// Do not use this file.

export const config = {
  language: 'de',
  invoicerMockApi: false,
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
