import React from 'react'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#yourAppElement')

class Dialog extends React.Component {
  constructor() {
    super()

    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    console.log('Open called')
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal() {}

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="rectangle">
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="rectangle1">
            <h2 ref={subtitle => (this.subtitle = subtitle)}>
              SLIDE INFORMATION
            </h2>
          </div>

          <div className="rectangle2">
            <div>Position</div>
            <input
              name="position"
              className="position"
              onChange={this.handleInputChange}
            />
            <div>Media</div>
            <input
              name="media"
              className="media"
              onChange={this.handleInputChange}
            />
            <div>Duration</div>
            <input
              name="duration"
              className="duration"
              onChange={this.handleInputChange}
            />
            <div>Title</div>
            <input
              name="title"
              className="title"
              onChange={this.handleInputChange}
            />
            <div>Description</div>
            <input
              name="decription"
              className="description"
              onChange={this.handleInputChange}
            />
          </div>

          <button className="btn save" onClick={this.closeModal}>
            Save
          </button>

          <button className="btn cancel" onClick={this.closeModal}>
            Cancel
          </button>
        </Modal>
        <style jsx>{`
          .rectangle {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-content: center;
            font-color: black;
          }

          .rectangle1 {
            display: flex;
            flex-direction: column;
          }

          .rectangle2 {
            display: flex;
            flex-direction: column;
          }

          .position {
            height: 25px;
            width: 50px;
          }

          .media {
            height: 50px;
            width: 500px;
          }

          .duration {
            height: 25px;
            width: 50px;
          }

          .title {
            height: 25px;
            width: 500px;
          }

          .description {
            height: 100px;
            width: 500px;
          }

          .btn {
            background: lightgray;
            padding: 20px;
            text-decoration: none;
            text-transform: uppercase;
            color: white;
            border-radius: 4px;
            margin: 20px;
            display: inline-block;
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

//ReactDOM.render(<App />, appElement)

export default Dialog
