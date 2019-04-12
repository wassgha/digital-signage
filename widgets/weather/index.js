import BaseWidget from '../base_widget'
import WeatherContent from './src/WeatherContent'
import WeatherOptions from './src/WeatherOptions'

export default class Weather extends BaseWidget {
  constructor() {
    super({
      name: 'Weather',
      version: '0.1',
      icon: 'cloud-sun',
      defaultData: {
        zip: '10001',
        unit: 'imperial'
      }
    })
  }

  get Widget() {
    return WeatherContent
  }

  get Options() {
    return WeatherOptions
  }
}
