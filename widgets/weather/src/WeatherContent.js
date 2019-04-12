/**
 * @fileoverview Slideshow component that given an array of slide descriptions
 * of mixed types, renders the slides and automatically plays the slideshow for
 * the given durations
 */

import React, { Component } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config } from '@fortawesome/fontawesome-svg-core'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

import WeatherIcon from './WeatherIcon'

const DEFAULT_UNIT = 'imperial'
const DEFAULT_ZIP = '10001'
const API_KEY = 'da6ef4bf43eed800fdadd4a728766089'
const API_URL = 'http://api.openweathermap.org/data/2.5'

class WeatherContent extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    const { data: { unit = DEFAULT_UNIT, zip = DEFAULT_ZIP } = {} } = this.props
    axios
      .get(`${API_URL}/weather?zip=${zip},us&apiKey=${API_KEY}&units=${unit}`)
      .then(({ data }) => {
        const {
          name,
          weather,
          main: { temp }
        } = data
        const { icon, description } = weather[0]
        this.setState({ name, icon, temp, description })
      })
  }

  render() {
    const { name, icon, temp, description } = this.state
    return (
      <div className='weather'>
        <div className='bgicon'>
          <WeatherIcon icon={icon} />
        </div>
        <div className='info'>
          <div className='temp'>{Math.round(temp)}°</div>
          <div className='desc'>{description}</div>
          <div className='location'>
            <div className='marker'>
              <FontAwesomeIcon icon={faMapMarker} size='xs' fixedWidth />
            </div>
            <div className='name'>{name}</div>
          </div>
        </div>
        <div className='icon'>
          <WeatherIcon icon={icon} />
        </div>
        <style jsx>
          {`
            .weather {
              position: relative;
              box-sizing: border-box;
              height: 100%;
              width: 100%;
              background: #358aed;
              flex: 1;
              padding: 16px;
              font-family: 'Open Sans', sans-serif;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }
            .info {
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
            }
            .icon {
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              transform: scale(2);
              transform-origin: top right;
            }
            .info .temp {
              font-family: 'Open Sans', sans-serif;
              font-size: 48px;
              line-height: 38px;
              margin-bottom: 4px;
            }
            .info .desc {
              font-family: 'Open Sans', sans-serif;
              font-size: 14px;
              text-transform: capitalize;
              margin-bottom: 4px;
            }
            .bgicon {
              position: absolute;
              right: 20px;
              top: 0px;
              transform: scale(5) rotate(-5deg);
              opacity: 0.3;
            }
            .location {
              display: flex;
              flex-direction: row;
              align-items: center;
            }
            .location .name {
              font-family: 'Open Sans', sans-serif;
              font-size: 12px;
              text-transform: capitalize;
            }
            .location .marker {
              margin-right: 4px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          `}
        </style>
      </div>
    )
  }
}

export default WeatherContent
