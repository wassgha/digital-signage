import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactSwitch from 'react-switch'

class Switch extends React.Component {
  constructor(props) {
    super(props)
    const { checked = false } = this.props
    this.state = {
      checked: checked
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({ checked: nextProps.checked })
    }
  }

  handleChange = checked => {
    const { onChange = () => {}, name = '' } = this.props
    this.setState({ checked }, () => {
      onChange(name, checked)
    })
  }

  render() {
    const {
      checkedLabel,
      uncheckedLabel,
      checkedIcon,
      uncheckedIcon,
      inline = true,
      expand = true,
      disabled = false,
      color = '#7bc043',
      className
    } = this.props
    const { checked } = this.state

    return (
      <div className='inputGroup'>
        {checkedLabel && (
          <label>
            {checkedLabel}
            {checkedIcon && (
              <div className='icon'>
                <FontAwesomeIcon icon={checkedIcon} fixedWidth color='#828282' />
              </div>
            )}
          </label>
        )}
        <div className={'switch-container'}>
          <ReactSwitch
            onChange={this.handleChange}
            checked={checked}
            disabled={disabled}
            className={className}
            uncheckedIcon={false}
            checkedIcon={false}
            onColor={color}
          />
        </div>
        {uncheckedLabel && (
          <label>
            {uncheckedIcon && (
              <div className='icon'>
                <FontAwesomeIcon icon={uncheckedIcon} fixedWidth color='#828282' />
              </div>
            )}
            {uncheckedLabel}
          </label>
        )}
        <style jsx>{`
          .inputGroup {
            margin-bottom: 16px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
          }

          .switch-container {
            margin-right: 8px;
            margin-left: 8px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }

          label {
            color: #878787;
            font-family: 'Open Sans', sans-serif;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding-bottom: ${inline ? '0px' : '16px'};
          }

          label .icon {
            margin-right: 8px;
            margin-left: 8px;
          }

          input {
            font-family: 'Open Sans', sans-serif;
            color: #333;
            background-color: #f7f7f7;
            min-height: 40px;
            min-width: ${expand ? '450px' : '0px'};
            border-radius: 2px;
            border: none;
            outline: none;
            padding: 8px;
            padding-left: 16px;
            padding-right: 16px;
            font-size: 16px;
          }
        `}</style>
      </div>
    )
  }
}

export default Switch
