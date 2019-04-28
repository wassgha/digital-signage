/**
 * Overloads the _document container from Next.js in order to add custom fonts
 */

import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import flush from 'styled-jsx/server'

class AppDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    const styles = flush()
    return { ...page, styleTags, styles }
  }

  render() {
    return (
      <html>
        <Head>
          <style>{'body { margin: 0 } /* custom! */'}</style>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
          <link
            href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800'
            rel='stylesheet'
          />
          <script src='https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js' />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default AppDocument
