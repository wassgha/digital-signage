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
    border: 'none',
    maxHeight: '80vh',
    overflowY: 'auto'
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

  open = e => {
    if (e) e.stopPropagation()
    this.setState({ modalIsOpen: true })
  }

  close = e => {
    if (e) e.stopPropagation()
    this.setState({ modalIsOpen: false })
  }

  render() {
    const { children, style = {} } = this.props
    return (
      <div className='container'>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.close}
          style={{ ...modalStyles, ...style }}
          ariaHideApp={false}
        >
          <div className='form'>{children}</div>
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
        `}</style>
      </div>
    )
  }
}

export default Dialog
