import React from 'react'
import Dialog from '../Dialog'
import { Form, Input, Button, ButtonGroup } from '../Form'

import { getSlide, addSlide, updateSlide } from '../../actions/slide'

class SlideEditDialog extends React.Component {
  constructor() {
    super()

    this.state = {}
  }

  componentDidMount() {
    this.refresh()
  }

  refresh = () => {
    const { slide } = this.props
    if (slide) {
      getSlide(slide).then(data => {
        this.setState(data)
      })
    }
  }

  open = () => {
    this.refresh()
    this.dialog && this.dialog.open()
  }

  close = () => {
    const { refresh } = this.props
    this.dialog && this.dialog.close()
    if (refresh) refresh()
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  save = () => {
    const { slide, slideshow, upload } = this.props
    if (slideshow) {
      addSlide(slideshow, upload, this.state).then(() => {
        this.close()
      })
    } else {
      updateSlide(slide, upload, this.state).then(() => {
        this.close()
      })
    }
  }

  render() {
    const { order, data, title, description, duration } = this.state
    return (
      <Dialog ref={ref => (this.dialog = ref)}>
        <Form>
          <Input
            type={'text'}
            label={'Order'}
            name={'order'}
            value={order}
            onChange={this.handleChange}
          />
          <Input
            type={'text'}
            label={'Media'}
            name={'data'}
            value={data}
            onChange={this.handleChange}
          />
          <Input
            type={'number'}
            label={'Duration'}
            name={'duration'}
            value={duration}
            onChange={this.handleChange}
          />
          <Input
            type={'text'}
            label={'Title'}
            name={'title'}
            value={title}
            onChange={this.handleChange}
          />
          <Input
            type={'textarea'}
            label={'Description'}
            name={'description'}
            value={description}
            onChange={this.handleChange}
          />
        </Form>
        <ButtonGroup>
          <Button text={'Save'} color={'#8bc34a'} onClick={this.save} />
          <Button text={'Cancel'} color={'#e85454'} onClick={this.close} />
        </ButtonGroup>
      </Dialog>
    )
  }
}

export default SlideEditDialog
