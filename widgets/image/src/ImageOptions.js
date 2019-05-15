import React, { Component } from 'react'
import { Form, Input, InlineInputGroup } from '../../../components/Form'
import { standaloneUpload } from '../../../actions/slide'

class ImageOptions extends Component {
  constructor(props) {
    super(props)
    const { title, color, fit, url } = props.data || {}
    this.state = {
      title,
      color,
      fit,
      url
    }
  }

  handleChange = async (name, value) => {
    const { onChange = () => {} } = this.props
    if (name == 'upload') {
      name = 'url'
      const resp = await standaloneUpload(value)
      value = resp.data.url
    }
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
    const { title, color, fit, url } = this.state
    return (
      <div className={'container'}>
        <Form>
          <h3>Widget: Standalone Image</h3>
          <p>Choose your preferences for the image widget.</p>
          <InlineInputGroup>
            <Input
              inline={false}
              label={'Background'}
              type={'color'}
              name={'color'}
              value={color}
              onChange={this.handleChange}
              expand={false}
            />
            <Input
              inline={false}
              label={'Title (Optional)'}
              type={'text'}
              name={'title'}
              placeholder={'Optional title...'}
              value={title}
              onChange={this.handleChange}
              expand={true}
            />
          </InlineInputGroup>
          <InlineInputGroup>
            <Input
              inline={false}
              label={'Image'}
              type={'photo'}
              name={'url'}
              value={url}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Image fit'}
              type={'select'}
              name={'fit'}
              value={fit}
              choices={[
                { label: 'Zoom-in (Cover)', id: 'cover' },
                { label: 'Fit to Container', id: 'contain' }
              ]}
              onChange={this.handleChange}
              expand={false}
            />
          </InlineInputGroup>
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

export default ImageOptions
