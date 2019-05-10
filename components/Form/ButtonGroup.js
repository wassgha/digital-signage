import React from 'react'

class ButtonGroup extends React.Component {
  render() {
    const { children, align = 'right' } = this.props
    return (
      <div className={'btnGroup'}>
        {children}
        <style jsx>{`
          .btnGroup {
            display: flex;
            flex-direction: row;
            justify-content: ${align == 'right'
              ? 'flex-end'
              : align == 'center'
              ? 'center'
              : 'flex-start'};
            flex: 1;
          }
        `}</style>
      </div>
    )
  }
}

export default ButtonGroup
