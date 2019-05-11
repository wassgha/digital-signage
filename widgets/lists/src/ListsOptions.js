import React, { Component } from 'react'
import { Form, Input, InlineInputGroup, Button } from '../../../components/Form'

import ListsContent from './ListsContent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

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

  handleChange2 = (index, value) => {
    const { onChange = () => {} } = this.props
    this.state.list[index] = value
    this.setState(
      {
        ...this.state
      },
      () => {
        onChange(this.state)
      }
    )
  }

  addEntry = () => {
    this.setState({
      list: [...this.state.list, '']
    })

    return Promise.resolve()
  }
  deleteEntry = i => {
    this.setState(state => {
      state.list.filter((item, j) => i !== j)
    })
    return Promise.resolve()
  }

  render() {
    const { color, textColor, list = [] } = this.state
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
          <div className='list'>
            {list.map((listElement, index) => (
              <div className='element'>
                <Input
                  inline={false}
                  name={index}
                  value={listElement}
                  onChange={this.handleChange2}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  fixedWidth
                  color='#828282'
                  onClick={this.deleteEntry}
                />
              </div>
            ))}
          </div>
          <Button text={'Add Entry'} color={'#8bc34a'} onClick={this.addEntry} />
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
            .element {
              display: flex;
              flex-direction: row;
              justify-content: center;
            }
          `}
        </style>
      </div>
    )
  }
}

export default ListsOptions
