import React from 'react'

class Input extends React.Component {
  constructor(props) {
    super(props)
    const { value } = this.props
    this.state = {
      value
    }
  }
  handleInputChange = event => {
    const { onChange = () => {}, name = '' } = this.props
    const target = event.target
    const value = target.value

    this.setState({ value }, () => {
      onChange(name, value)
    })
  }

  render() {
    const { label, type = 'text', placeholder = '' } = this.props
    const { value = '' } = this.state

    return (
      <div className='inputGroup'>
        {label && <label>{label}</label>}
        {type == 'text' || type == 'password' || type == 'number' ? (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={this.handleInputChange}
          />
        ) : (
          <textarea onChange={this.handleInputChange} value={value} />
        )}
        <style jsx>{`
          .inputGroup {
            margin-bottom: 16px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
          }

          label {
            margin-right: 16px;
            color: #878787;
            font-family: 'Open Sans', sans-serif;
            min-width: 100px;
            max-width: 100px;
            display: inline-block;
            padding-top: 16px;
          }

          input,
          textarea {
            background-color: #f7f7f7;
            min-height: 40px;
            min-width: 450px;
            border-radius: 2px;
            border: none;
            outline: none;
            padding: 8px;
            padding-left: 16px;
            padding-right: 16px;
            font-size: 16px;
          }

          textarea {
            resize: vertical;
            min-height: 100px;
          }

          input[type='number'] {
            min-width: 50px !important;
            max-width: 50px !important;
          }
        `}</style>
      </div>
    )
  }
}

export default Input
