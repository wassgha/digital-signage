import Frame from '../components/Admin/Frame.js'
import Upload from '../components/Upload.js'
import List from '../components/List.js'

const Slideshows = () => (
  <Frame>
    <h1>Slideshows</h1>
    <div className='wrapper'>
      <Upload />
      <List />
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

export default Slideshows
