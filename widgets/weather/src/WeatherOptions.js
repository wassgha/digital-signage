import React, { Component } from 'react'
import { Form, Input } from '../../../components/Form'

class WeatherOptions extends Component {
  constructor(props) {
    super(props)
    const { zip, unit } = props.data || {}
    this.state = {
      zip,
      unit
    }
  }
  handleChange = (name, value) => {
    const { onChange = () => {} } = this.props
    this.setState(
      {
        [name]: value
      },
      () => {
        onChange(this.state)
      }
    )
  }

  render() {
    const { zip, unit } = this.state
    return (
      <Form>
        <h3>Widget: Weather</h3>
        <p>Choose your preferences for the weather widget</p>
        <Input
          inline={false}
          label={'ZIP Code'}
          type={'text'}
          name={'zip'}
          value={zip}
          onChange={this.handleChange}
        />
        <Input
          inline={false}
          label={'Temperature Unit'}
          type={'select'}
          name={'unit'}
          value={unit}
          choices={[{ id: 'imperial', label: 'Fahrenheit' }, { id: 'metric', label: 'Celsius' }]}
          onChange={this.handleChange}
        />
        <style jsx>
          {`
            h3,
            p {
              font-family: 'Open Sans', sans-serif;
            }
          `}
        </style>
      </Form>
    )
  }
}

export default WeatherOptions
