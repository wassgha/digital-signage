import Frame from '../components/Admin/Frame.js'
import Upload from '../components/Upload.js'
import List from '../components/List.js'
import Dialog from '../components/Dialog.js'

import { protect } from '../helpers/auth.js'

const Slideshows = ({ loggedIn }) => (
  <Frame loggedIn={loggedIn}>
    <h1>Slideshows</h1>
    <div className='wrapper'>
      <Upload />
      <List />
      <Dialog />
    </div>
    <style jsx>
      {`
        h1 {
          font-family: 'Open Sans', sans-serif;
          font-size: 24px;
          color: #4f4f4f;
          margin: 0px;
        }
        .wrapper {
          margin: 40px auto;
          max-width: 640px;
        }
      `}
    </style>
  </Frame>
)

export default protect(Slideshows)
