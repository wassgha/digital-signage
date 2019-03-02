/**
 * @fileoverview DisplayFrame component which renders the date, time and layout
 * for the added widgets
 */

import Clock from 'react-live-clock'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWifi } from '@fortawesome/free-solid-svg-icons'

const DisplayFrame = ({ children }) => (
  <div className="display">
    <div className={'status'}>
      <div className={'left'}>
        <Clock ticking={true} format={'dddd, MMMM Mo.'} />
      </div>
      <div className={'right'}>
        <div className={'wifi'}>
          <FontAwesomeIcon className={'wifi'} icon={faWifi} />
        </div>
        <div className={'clock'}>
          <Clock ticking={true} format={'H:mm'} />
        </div>
      </div>
    </div>
    {children}
    <style jsx>
      {`
        .display {
          display: flex;
          flex-direction: column;
          width: 100vw;
          height: 100vh;
          background: black;
          font-family: Open Sans, sans-serif;
          color: white;
        }
        .status {
          padding: 30px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .status .left {
        }
        .status .right {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
        .status .right .wifi {
          margin-right: 10px;
          color: #baff23;
        }
      `}
    </style>
  </div>
)

export default DisplayFrame
