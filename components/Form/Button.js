import React from 'react'

class Button extends React.Component {
  render() {
    const {
      onClick = () => {},
      text = 'Submit',
      color = 'gray',
      style = { marginLeft: 16 }
    } = this.props
    return (
      <button className={'btn save'} onClick={onClick} style={style}>
        {text}
        <style jsx>{`
          .btn {
            font-family: 'Open Sans', sans-serif;
            background: lightgray;
            text-decoration: none;
            text-transform: uppercase;
            color: white;
            font-size: 14px;
            border-radius: 4px;
            border: none;
            display: inline-block;
            padding: 16px;
            padding-left: 24px;
            padding-right: 24px;
            outline: none;
            background: ${color};
            cursor: pointer;
          }
        `}</style>
      </button>
    )
  }
}

export default Button
