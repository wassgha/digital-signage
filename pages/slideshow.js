import React from 'react'

import Frame from '../components/Admin/Frame.js'
import SlideList from '../components/Admin/SlideList.js'
import Upload from '../components/Upload.js'
import Dialog from '../components/Dialog.js'

import { getSlideshow } from '../actions/slideshow'

class Slideshow extends React.Component {
  constructor(props) {
    super(props)
    this.slideList = React.createRef()
  }

  static async getInitialProps({ query, req }) {
    const id = query && query.id
    const host =
      req && req.headers && req.headers.host ? 'http://' + req.headers.host : window.location.origin
    const slideshow = id && (await getSlideshow(id, host))
    return { slideshow: slideshow }
  }

  refresh = () => {
    this.slideList && this.slideList.current && this.slideList.current.refresh()
  }

  render() {
    const { slideshow } = this.props
    return (
      <Frame>
        <h1>Slideshow: {(slideshow && slideshow.title) || 'Untitled Slideshow'}</h1>
        <div className='wrapper'>
          <Upload slideshow={slideshow && slideshow._id} refresh={this.refresh} />
          <SlideList ref={this.slideList} slideshow={slideshow && slideshow._id} />
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
  }
}

export default Slideshow
