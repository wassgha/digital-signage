import React from 'react'
import Dialog from '../Dialog'
import { Form, Input, Button, ButtonGroup } from '../Form'

import { getSlide, addSlide, updateSlide } from '../../actions/slide'

class SlideEditDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      upload: props.upload
    }
  }

  componentDidMount() {
    this.refresh()
  }

  componentDidUpdate(prevProps) {
    if (this.props.upload != prevProps.upload) {
      this.setState({
        upload: this.props.upload
      })
    }
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
      [name]: value,
      // Clean up data if the type of slide changed
      ...(name == 'type' ? { data: '' } : {})
    })
  }

  save = () => {
    const { slide, slideshow } = this.props
    const { upload, ...otherProps } = this.state
    if (slideshow) {
      return addSlide(slideshow, upload, otherProps).then(() => {
        this.close()
      })
    } else {
      return updateSlide(slide, upload, otherProps).then(() => {
        this.close()
      })
    }
  }

  render() {
    const { data, title, description, duration, type = 'photo', upload } = this.state

    return (
      <Dialog ref={ref => (this.dialog = ref)}>
        <Form>
          <Input
            type={'select'}
            name={'type'}
            label={'Slide Type'}
            value={type}
            choices={[
              { id: 'youtube', label: 'Youtube Video' },
              { id: 'web', label: 'Web Page' },
              { id: 'photo', label: 'Photo' },
              { id: 'freeform', label: 'Freeform Editor' }
            ]}
            onChange={this.handleChange}
          />
          {type == 'photo' || upload ? (
            <Input
              type={'photo'}
              label={'Photo'}
              name={'upload'}
              value={upload ? upload.preview : data}
              onChange={this.handleChange}
              inline={true}
            />
          ) : type == 'freeform' || upload ? (
            <Input
              type={'freeform'}
              label={'Slide content'}
              name={'data'}
              value={data}
              onChange={this.handleChange}
            />
          ) : (
            <Input
              type={'text'}
              label={type == 'web' ? 'Web URL' : type == 'youtube' ? 'Youtube URL' : 'Data'}
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
