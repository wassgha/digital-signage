import React, { Component } from 'react'
import Dialog from './Dialog'
import { Form, Button, ButtonGroup } from './Form'
import dynamic from 'next/dynamic'

const DesignerWithNoSSR = dynamic(() => import('react-designer'), {
  ssr: false
})

export default class FreeformEditor extends Component {
  constructor(props) {
    super(props)
    let data
    try {
      data = JSON.parse(props.data)
    } catch {
      data = []
    }
    this.state = {
      objects: data
    }
  }

  openDialog = () => {
    this.dialog && this.dialog.open()
    return Promise.resolve()
  }

  save = () => {
    const { onChange } = this.props
    onChange(JSON.stringify(this.state.objects))
    this.closeDialog()
    return Promise.resolve()
  }

  closeDialog = () => {
    this.dialog && this.dialog.close()
    return Promise.resolve()
  }

  render() {
    const { objects } = this.state
    return [
      <Button text='Open Editor' onClick={this.openDialog} style={{ margin: 0 }} />,
      <Dialog
        ref={ref => (this.dialog = ref)}
        style={{
          content: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }
        }}
      >
        <DesignerWithNoSSR
          width={640}
          height={480}
          onUpdate={objects => this.setState({ objects })}
          objects={objects}
        />
        <br />
        <ButtonGroup align='center'>
          <Button text={'Finish Editing'} color={'#8bc34a'} onClick={this.save} />
          <Button text={'Cancel'} color={'#e85454'} onClick={this.closeDialog} />
        </ButtonGroup>
      </Dialog>
    ]
  }
}
