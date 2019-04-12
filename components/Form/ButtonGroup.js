import React from 'react'

class ButtonGroup extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div className={'btnGroup'}>
        {children}
        <style jsx>{`
          .btnGroup {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            flex: 1;
          }
        `}</style>
      </div>
    )
  }
}

export default ButtonGroup
