/**
 * @fileoverview Preview page (shows the display frame and renders all the
 * widgets inside of it)
 */

import React from 'react'

import Display from '../components/Display/Display.js'

class DisplayPage extends React.Component {
  constructor(props) {
    super(props)
  }

  static async getInitialProps({ req }) {
    const host =
      req && req.headers && req.headers.host ? 'http://' + req.headers.host : window.location.origin
    return { host: host }
  }
  render() {
    const { host } = this.props
    return (
      <div className={'container'}>
        <Display host={host} />
        <style jsx>
          {`
            .container {
              display: flex;
              width: 100vw;
              height: 100vh;
            }
          `}
        </style>
      </div>
    )
  }
}

export default DisplayPage
