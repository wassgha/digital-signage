import React from 'react'
import ReactDom from 'react-dom'
import animateScrollTo from 'animated-scroll-to'

class AutoScroll extends React.Component {
  constructor(props) {
    super(props)
    this.container = React.createRef()
  }

  componentDidMount() {
    if (!this.container || !this.container.current) return
    const containerNode = ReactDom.findDOMNode(this.container.current)
    if (!containerNode) return

    const { duration = 3000 } = this.props
    setInterval(() => {
      animateScrollTo(9999999, {
        minDuration: duration,
        element: containerNode
      })
      setTimeout(() => {
        animateScrollTo(0, {
          minDuration: duration,
          element: containerNode
        })
      }, duration)
    }, duration)
  }

  render() {
    const { children, style = {} } = this.props
    return (
      <div className='container' ref={this.container} style={style}>
        {children}
        <style jsx>{`
          .container {
            display: flex;
            width: 100%;
            height: 100%;
            overflow: auto;
          }
        `}</style>
      </div>
    )
  }
}

export default AutoScroll
