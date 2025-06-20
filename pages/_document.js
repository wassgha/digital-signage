/**
 * Overloads the _document container from Next.js in order to add custom fonts
 */

import { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <link
          href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800'
          rel='stylesheet'
        />
        <script src='https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
