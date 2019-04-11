import React from 'react'

class Form extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div className={'form'}>
        {children}
        <style jsx>{`
          .form {
            display: flex;
            flex-direction: column;
          }
        `}</style>
      </div>
    )
  }
}

export default Form
