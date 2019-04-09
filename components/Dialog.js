import React from 'react'
import Modal from 'react-modal'

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none'
  },
  overlay: { zIndex: 3, backgroundColor: 'rgba(0,0, 0, 0.6)' }
}

class Dialog extends React.Component {
  constructor() {
    super()

    this.state = {
      modalIsOpen: false
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal = () => {}

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className='container'>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={modalStyles}
        >
          <div className='form'>
            <div className='inputGroup'>
              <label>Position</label>
              <input name='position' onChange={this.handleInputChange} />
            </div>
            <div className='inputGroup'>
              <label>Media</label>
              <input name='media' onChange={this.handleInputChange} />
            </div>
            <div className='inputGroup'>
              <label>Duration</label>
              <input name='duration' onChange={this.handleInputChange} type='number' />
            </div>
            <div className='inputGroup'>
              <label>Title</label>
              <input name='title' onChange={this.handleInputChange} />
            </div>
            <div className='inputGroup'>
              <label>Description</label>
              <textarea name='description' onChange={this.handleInputChange} />
            </div>
          </div>

          <div className={'btnGroup'}>
            <button className={'btn save'} onClick={this.closeModal}>
              Save
            </button>
            <button className={'btn cancel'} onClick={this.closeModal}>
              Cancel
            </button>
          </div>
        </Modal>
        <style jsx>{`
          .container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-content: center;
            font-color: black;
            font-family: 'Open Sans', sans-serif;
          }

          .form {
            display: flex;
            flex-direction: column;
          }

          .form .inputGroup {
            margin-bottom: 16px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
          }

          .form label {
            margin-right: 16px;
            color: #878787;
            font-family: 'Open Sans', sans-serif;
            min-width: 100px;
            max-width: 100px;
            display: inline-block;
            padding-top: 16px;
          }

          .form input,
          .form textarea {
            background-color: #f7f7f7;
            min-height: 40px;
            min-width: 450px;
            border-radius: 2px;
            border: none;
            outline: none;
            padding: 8px;
            padding-left: 16px;
            padding-right: 16px;
            font-size: 16px;
          }

          .form textarea {
            resize: vertical;
            min-height: 100px;
          }

          .form input[type='number'] {
            min-width: 50px !important;
            max-width: 50px !important;
          }

          .btnGroup {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            flex: 1;
          }

          .btn {
            font-family: 'Open Sans', sans-serif;
            background: lightgray;
            text-decoration: none;
            text-transform: uppercase;
            color: white;
            font-size: 14px;
            border-radius: 4px;
            border: none;
            display: inline-block;
            margin-left: 16px;
            padding: 16px;
            padding-left: 24px;
            padding-right: 24px;
            outline: none;
          }

          .btn.save {
            background: #8bc34a;
          }

          .btn.cancel {
            background: #e85454;
          }
        `}</style>
      </div>
    )
  }
}

export default Dialog
