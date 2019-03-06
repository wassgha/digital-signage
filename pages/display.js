/**
 * @fileoverview Preview page (shows the display frame and renders all the
 * widgets inside of it)
 */

import Display from '../components/Display/Display.js'

const DisplayPage = () => (
  <div className={'container'}>
    <Display />
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

export default DisplayPage
