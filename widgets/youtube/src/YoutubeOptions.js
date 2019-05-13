import React, { Component } from 'react'
import { Form, Input } from '../../../components/Form'

class YoutubeOptions extends Component {
  constructor(props) {
    super(props)
    const { title, color, url } = props.data || {}
    this.state = {
      title,
      color,
      url
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
    const { title, color, url } = this.state
    return (
      <div className={'container'}>
        <Form>
          <h3>Widget: Youtube</h3>
          <p>Choose your preferences for the youtube widget.</p>
          <Input
            inline={false}
            label={'Webpage URL'}
            type={'text'}
            name={'url'}
            value={url}
            onChange={this.handleChange}
          />
          <Input
            inline={false}
            label={'Background color'}
            type={'color'}
            name={'color'}
            value={color}
            onChange={this.handleChange}
          />
          <Input
            inline={false}
            label={'Widget title'}
            type={'text'}
            name={'title'}
            value={title}
            placeholder={'Optional title...'}
            onChange={this.handleChange}
          />
        </Form>
        <style jsx>
          {`
            h3,
            p {
              font-family: 'Open Sans', sans-serif;
            }
            .container {
              display: flex;
              flex-direction: column;
            }
          `}
        </style>
      </div>
    )
  }
}

export default YoutubeOptions
