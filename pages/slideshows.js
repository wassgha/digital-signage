import React from 'react'
import { view } from '@risingstack/react-easy-state'

import Frame from '../components/Admin/Frame.js'
import SlideshowList from '../components/Admin/SlideshowList.js'
import Dialog from '../components/Dialog.js'
import { Button } from '../components/Form'

import { addSlideshow } from '../actions/slideshow'
import { protect } from '../helpers/auth.js'

import { display } from '../stores'

class Slideshows extends React.Component {
  constructor(props) {
    super(props)
    this.slideshowList = React.createRef()
  }

  add = () => {
    return addSlideshow().then(() => {
      this.slideshowList && this.slideshowList.current && this.slideshowList.current.refresh()
    })
  }

  componentDidMount() {
    const { displayId } = this.props
    display.setId(displayId)
  }

  render() {
    const { loggedIn } = this.props
    return (
      <Frame loggedIn={loggedIn}>
        <h1>Slideshows</h1>
        <div className='wrapper'>
          <SlideshowList ref={this.slideshowList} />
          <Dialog />
          <Button
            text={'+ Add new slideshow'}
            color={'#8bc34a'}
            onClick={this.add}
            style={{ marginLeft: 0, width: '100%' }}
          />
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

export default protect(view(Slideshows))
