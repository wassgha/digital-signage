import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import Frame from '../components/Admin/Frame.js'
import SlideList from '../components/Admin/SlideList.js'
import Upload from '../components/Upload.js'
import Dialog from '../components/Dialog.js'
import { Input } from '../components/Form'

import { getSlideshow, updateSlideshow } from '../actions/slideshow'

class Slideshow extends React.Component {
  constructor(props) {
    super(props)
    this.state = { slideshow: props.slideshow, editingTitle: false }
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
    const { _id: id } = this.props.slideshow
    return getSlideshow(id).then(slideshow => {
      this.setState({ slideshow }, () => {
        this.slideList && this.slideList.current && this.slideList.current.refresh()
      })
    })
  }

  render() {
    const { editingTitle, slideshow } = this.state
    return (
      <Frame>
        <h1 className='title'>Slideshow:</h1>

        {editingTitle ? (
          <Input
            className='title'
            placeholder='Enter New Name Here'
            value={slideshow && slideshow.title}
            onKeyDown={event => {
              if (event.key == 'Enter') {
                updateSlideshow(slideshow._id, { title: event.target.value })
                  .then(() => {
                    this.setState({
                      editingTitle: false
                    })
                  })
                  .then(this.refresh)
              }
            }}
            onClick={e => {
              if (e) e.stopPropagation()
            }}
            expand={false}
          />
        ) : (
          <div className='title'>
            <h1 className='title-text'>{(slideshow && slideshow.title) || 'Untitled Slideshow'}</h1>
            {'  '}
            <FontAwesomeIcon
              icon={faEdit}
              fixedWidth
              color='#828282'
              onClick={e => {
                if (e) e.preventDefault()
                this.setState(prevState => ({
                  editingTitle: !prevState.editingTitle
                }))
              }}
            />
          </div>
        )}
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
            .title {
              display: inline-block;
            }
            .title-text {
              display: inline-block;
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
