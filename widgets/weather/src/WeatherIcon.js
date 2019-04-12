import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config } from '@fortawesome/fontawesome-svg-core'
import {
  faBolt,
  faSmog,
  faCloud,
  faSun,
  faCloudSun,
  faCloudRain,
  faCloudMoonRain,
  faSnowflake,
  faCloudMoon
} from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

class WeatherIcon extends Component {
  convertIcon(icon) {
    switch (icon) {
      case '01d':
        return faSun
      case '01n':
        return faCloudSun
      case '02d':
        return faCloudSun
      case '02n':
        return faCloudMoon
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return faCloud
      case '09d':
      case '10d':
        return faCloudRain
      case '09n':
      case '10n':
        return faCloudMoonRain
      case '11d':
      case '11n':
        return faBolt
      case '13d':
      case '13n':
        return faSnowflake
      case '50d':
      case '50n':
        return faSmog
      default:
        return faCloud
    }
  }
  render() {
    const { icon = '' } = this.props
    return <FontAwesomeIcon icon={this.convertIcon(icon)} size={'2x'} />
  }
}

export default WeatherIcon
