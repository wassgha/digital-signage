import React from 'react'
import { view } from '@risingstack/react-easy-state'

import Frame from '../components/Admin/Frame.js'
import ScreenList from '../components/Admin/ScreenList.js'
import Dialog from '../components/Dialog.js'
import { Button } from '../components/Form'

import { addDisplay } from '../actions/display'
import { protect } from '../helpers/auth.js'

import { display } from '../stores'

class Screens extends React.Component {
  constructor(props) {
    super(props)
    this.screenList = React.createRef()
  }

  add = () => {
    return addDisplay().then(() => {
      this.screenList && this.screenList.current && this.screenList.current.refresh()
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
        <h1>Screens</h1>
        <div className='wrapper'>
          <ScreenList ref={this.screenList} />
          <Dialog />
          <Button
            text={'+ Add new screen'}
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

export default protect(view(Screens))
