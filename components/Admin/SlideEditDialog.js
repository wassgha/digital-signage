import React from 'react'
import Dialog from '../Dialog'
import { Form, Input, Button, ButtonGroup } from '../Form'

class SlideEditDialog extends React.Component {
  constructor() {
    super()

    this.state = {}
  }

  open = () => {
    this.dialog && this.dialog.open()
  }

  close = () => {
    this.dialog && this.dialog.close()
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <Dialog ref={ref => (this.dialog = ref)}>
        <Form>
          <Input type={'text'} label={'Position'} name={'position'} onChange={this.handleChange} />
          <Input type={'text'} label={'Media'} name={'media'} onChange={this.handleChange} />
          <Input
            type={'number'}
            label={'Duration'}
            name={'duration'}
            onChange={this.handleChange}
          />
          <Input type={'text'} label={'Title'} name={'title'} onChange={this.handleChange} />
          <Input
            type={'textarea'}
            label={'Description'}
            name={'description'}
            onChange={this.handleChange}
          />
        </Form>
        <ButtonGroup>
          <Button text={'Save'} color={'#8bc34a'} onClick={this.close} />
          <Button text={'Cancel'} color={'#e85454'} onClick={this.close} />
        </ButtonGroup>
      </Dialog>
    )
  }
}

export default SlideEditDialog
