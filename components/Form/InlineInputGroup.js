import React from 'react'

class InlineInputGroup extends React.Component {
  render() {
    const { children = [] } = this.props
    return (
      <div className={'inputGroup'}>
        {children.map((child, index) => (
          <div key={`input-${index}`} className={index == children.length - 1 ? 'last' : 'notlast'}>
            {child}
          </div>
        ))}
        <style jsx>{`
          .inputGroup {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            flex: 1;
          }
          .notlast {
            margin-right: 16px;
          }
        `}</style>
      </div>
    )
  }
}

export default InlineInputGroup
