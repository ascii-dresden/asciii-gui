export class Forecast {
  constructor(public latitude: number, public longitude: number, public timezone: string, public currently: Currently,
              public offset: number) { }
}

export class Currently {
  constructor(public time: number, public summary: string, public icon: string, public precipIntensity: number,
              public precipProbability: number, public precipType: string, public temperature: number,
              public apparentTemperature: number, public dewPoint: number, public humidity: number,
              public pressure: number, public windSpeed: number, public windGust: number, public windBearing: number,
              public cloudCover: number, public uvIndex: number, public visibility: number, public ozone: number) { }
}
