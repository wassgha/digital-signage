import React, { Component } from 'react'
import { Form, Input, InlineInputGroup, Button } from '../../../components/Form'

import ListsContent from './ListsContent'

class ListsOptions extends Component {
  constructor(props) {
    super(props)
    const { text, color, textColor, list = [] } = props.data || {}
    this.state = {
      text,
      color,
      textColor,
      list
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

  addField = () => {
    // list.add('hi')
    this.setState({
      list: [...this.state.list, <Input />]
    })

    return Promise.resolve()
  }

  render() {
    const { text, color, textColor, list = [] } = this.state
    return (
      <div className={'container'}>
        <Form>
          <h3>Widget: List</h3>
          <p>Choose your preferences for the list widget.</p>
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
          </InlineInputGroup>
          <Input
            inline={false}
            label={'Text to be displayed'}
            type={'textarea'}
            name={'text'}
            value={text}
            onChange={this.handleChange}
          />
          <div className='list'>
            {list.map(listElement => (
              <div>{listElement}</div>
            ))}
          </div>

          <Button text={'Add Field'} color={'#8bc34a'} onClick={this.addField} />
        </Form>
        <div className={'previewContainer'}>
          <p>Preview</p>
          <div className={'preview'}>
            <ListsContent data={this.state} />
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
            .list {
              height: 200px;
              width: 240px;
            }
          `}
        </style>
      </div>
    )
  }
}

export default ListsOptions
