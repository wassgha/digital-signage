import Frame from '../components/Admin/Frame.js'
import Upload from '../components/Slideshow/Upload.js'

const Slideshows = props => (
  <Frame>
    <h1>Slideshows</h1>
    <Upload/>
    <style jsx>
      {`
        h1 {
          font-family: 'Open Sans', sans-serif;
          font-size: 24px;
          color: #4f4f4f;
          margin: 0px;
        }
      `}
    </style>
  </Frame>
)

export default Slideshows
