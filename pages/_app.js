import App from 'next/app'
import React from 'react'

import '../styles/GridLayoutStyles.css'
import 'react-resizable/css/styles.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default class NextApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Component {...pageProps} />
      </>
    )
  }
}
