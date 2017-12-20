// Visit https://darksky.net/dev to get your own api key

export const forecast_io = {
  apiKey: '[your api key]',
  // Dresden <3
  location: {
    latitude: '51.05',
    longitude: '13.737'
  },
  params: {
    exclude: ['minutely', 'hourly', 'daily', 'alerts', 'flags'],
    lang: 'de',
    units: 'si'
  }
};
