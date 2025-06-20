import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { view } from '@risingstack/react-easy-state'

import Frame from '../components/Admin/Frame.js'
import SlideList from '../components/Admin/SlideList.js'
import SlideEditDialog from '../components/Admin/SlideEditDialog'
import Upload from '../components/Upload.js'
import Button from '../components/Form/Button.js'
import Dialog from '../components/Dialog.js'

import { getSlideshow, updateSlideshow } from '../actions/slideshow'
import { protect } from '../helpers/auth.js'
import { display } from '../stores'

const updateSlideshowThrottled = _.debounce((id, data) => {
  return updateSlideshow(id, data)
}, 300)

class Slideshow extends React.Component {
  constructor(props) {
    super(props)
    const { slideshow } = props
    this.state = { slideshow }
    this.slideList = React.createRef()
    this.dialog = React.createRef()
  }

  static async getInitialProps({ query, req }) {
    const id = query && query.id
    const host =
      req && req.headers && req.headers.host ? 'http://' + req.headers.host : window.location.origin
    const slideshow = id && (await getSlideshow(id, host))
    return { slideshow, host }
  }

  componentDidMount() {
    const { displayId } = this.props
    display.setId(displayId)
  }

  refresh = () => {
    const { _id: id } = this.props.slideshow
    return getSlideshow(id).then(slideshow => {
      this.setState({ slideshow }, () => {
        this.slideList && this.slideList.current && this.slideList.current.refresh()
      })
    })
  }

  openAddDialog = () => {
    return Promise.resolve(this.dialog && this.dialog.current.open())
  }

  render() {
    const { loggedIn } = this.props
    const { slideshow } = this.state
    return (
      <Frame loggedIn={loggedIn}>
        <h1 className='title'>Slideshow: </h1>{' '}
        <div className='editable-title'>
          <input
            className='input'
            placeholder='Untitled Slideshow'
            value={slideshow && slideshow.title}
            onChange={event => {
              const target = event.target
              const title = target && target.value
              this.setState(
                {
                  slideshow: {
                    ...slideshow,
                    title
                  }
                },
                () => {
                  updateSlideshowThrottled(slideshow._id, { title })
                }
              )
            }}
            onClick={e => {
              if (e) e.stopPropagation()
            }}
            size={slideshow && slideshow.title && slideshow.title.length}
          />
          <div className='icon'>
            <FontAwesomeIcon icon={faPencilAlt} fixedWidth color='#828282' />
          </div>
        </div>
        <div className='wrapper'>
          <Upload slideshow={slideshow && slideshow._id} refresh={this.refresh} />
          <SlideEditDialog
            slideshow={slideshow && slideshow._id}
            refresh={this.refresh}
            ref={this.dialog}
          />
          <Button
            text='Add a slide'
            color='#7bc043'
            style={{ flex: 1, margin: 0, width: '100%', marginTop: 20 }}
            onClick={this.openAddDialog}
          />
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
            .editable-title {
              display: inline-block;
              position: relative;
              margin-left: 16px;
              margin-right: 16px;
              border-bottom: 3px solid #aaa;
            }
            .editable-title .input {
              font-family: 'Open Sans', sans-serif;
              color: #666;
              background-color: transparent;
              min-height: 40px;
              border: none;
              outline: none;
              margin-right: 24px;
              font-size: 24px;
              font-weight: 600;
            }
            .editable-title .icon {
              position: absolute;
              right: 8px;
              top: 50%;
              margin-top: -8px;
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

export default protect(view(Slideshow))
