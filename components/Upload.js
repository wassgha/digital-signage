import { Component } from 'react'
import React from 'react'
import Dropzone from 'react-dropzone'
import SlideEditDialog from './Admin/SlideEditDialog.js'
import axios from 'axios'

class Upload extends Component {
  constructor(props) {
    super(props)
    this.dialog = React.createRef()
    this.state = {
      uploaded : false
    }
  }

  handleOnDropAccepted = acceptedFiles => {
    this.dialog && this.dialog.current.open()
    this.setState({uploaded:true})
  }

  handleOnDropRejected = rejectedFiles => {
    alert('This file type is not allowed:' + rejectedFiles[rejectedFiles.length - 1].name)
  }

  upload = acceptedFiles => {
    const formData = new FormData()
    formData.append('data', acceptedFiles[acceptedFiles.length - 1])
    const fileName = acceptedFiles[acceptedFiles.length - 1].name
    axios.post('/api/v1/slide', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }


  }

  render() {
    return (
      <div>
        <SlideEditDialog upload={this.upload} ref={this.dialog} />
        <Dropzone
          accept='image/*'
          onDropAccepted={this.handleOnDropAccepted}
          onDropRejected={this.handleOnDropRejected}
          multiple={false}
        >
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div {...getRootProps()} className='upload'>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Click or drop files here to add to the slideshow</p>
                ) : (
                  <p>Drop files here to add to the slideshow </p>
                )}
              </div>
            )
          }}
        </Dropzone>
        <style jsx>
          {`
            .upload {
              padding: 20px;
              font-family: 'Open Sans', sans-serif;
              text-align: center;
              border-radius: 4px;
              border: 2px dashed #adadad;
              cursor: pointer;
              background: white;
              outline: none;
            }
          `}
        </style>
      </div>
    )
  }
}

export default Upload
