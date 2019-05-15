import React, { Component } from 'react'
import { Form, Input, InlineInputGroup } from '../../../components/Form'

import AnnouncementContent from './AnnouncementContent'

class AnnouncementOptions extends Component {
  constructor(props) {
    super(props)
    const { text, color, textColor, titleTextColor, accentColor } = props.data || {}
    this.state = {
      text,
      color,
      textColor,
      titleTextColor,
      accentColor
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
    const { text, color, textColor, titleTextColor, accentColor } = this.state
    return (
      <div className={'container'}>
        <Form>
          <h3>Widget: Announcement</h3>
          <p>Choose your preferences for the announcement widget.</p>
          <InlineInputGroup>
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
              label={'Text color'}
              type={'color'}
              name={'textColor'}
              value={textColor}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Title Text color'}
              type={'color'}
              name={'titleTextColor'}
              value={titleTextColor}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Accent color'}
              type={'color'}
              name={'accentColor'}
              value={accentColor}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <Input
            inline={false}
            label={'Text to be displayed'}
            placeholder={'Enter an announcement here ...'}
            type={'textarea'}
            name={'text'}
            value={text}
            onChange={this.handleChange}
          />
        </Form>
        <div className={'previewContainer'}>
          <p>Preview</p>
          <div className={'preview'}>
            <AnnouncementContent data={this.state} />
          </div>
        </div>
        <style jsx>
          {`
            h3,
            p {
              font-family: 'Open Sans', sans-serif;
            }
            .container {
              display: flex;
              flex-direction: row;
            }
            .preview {
              display: block;
              width: 240px;
              height: 240px;
              border-radius: 6px;
              overflow: hidden;
            }
            .previewContainer {
              margin-left: 16px;
              width: 240px;
            }
          `}
        </style>
      </div>
    )
  }
}

export default AnnouncementOptions
