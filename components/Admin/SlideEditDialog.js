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
      return getSlide(slide).then(data => {
        this.setState(data)
      })
    } else {
      return Promise.resolve()
    }
  }

  open = () => {
    this.refresh()
    this.dialog && this.dialog.open()
  }

  close = () => {
    const { refresh } = this.props
    this.dialog && this.dialog.close()
    if (refresh) return refresh()
    return Promise.resolve()
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  save = () => {
    const { slide, slideshow, upload } = this.props
    if (slideshow) {
      return addSlide(slideshow, upload, this.state).then(() => {
        this.close()
      })
    } else {
      return updateSlide(slide, upload, this.state).then(() => {
        this.close()
      })
    }
  }

  render() {
    const { order, data, title, description, duration, type } = this.state
    const { upload } = this.props

    return (
      <Dialog ref={ref => (this.dialog = ref)}>
        <Form>
          <Input
            type={'number'}
            label={'Order'}
            name={'order'}
            value={order}
            placeholder={'0'}
            onChange={this.handleChange}
            disabled
          />
          {type == 'photo' || upload ? (
            <Input
              type={'photo'}
              label={'Photo'}
              name={'data'}
              value={upload ? upload.preview : data}
              onChange={this.handleChange}
            />
          ) : (
            <Input
              type={'text'}
              label={'Data'}
              name={'data'}
              value={data}
              onChange={this.handleChange}
            />
          )}
          <Input
            type={'number'}
            label={'Duration'}
            name={'duration'}
            value={duration}
            placeholder={'5'}
            onChange={this.handleChange}
          />
          <Input
            type={'text'}
            label={'Title'}
            name={'title'}
            value={title}
            placeholder={'Header title...'}
            onChange={this.handleChange}
          />
          <Input
            type={'textarea'}
            label={'Description'}
            name={'description'}
            value={description}
            placeholder={'Short content description...'}
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
