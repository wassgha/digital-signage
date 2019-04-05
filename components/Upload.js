import { Component } from 'react'
import React from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      SLIDE_LIST: []
    }
  }

  handleOnDropAccepted = acceptedFiles => {
    const formData = new FormData()
    formData.append('data', acceptedFiles[acceptedFiles.length - 1])
    axios.post('/api/v1/slide', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    this.setState({
      SLIDE_LIST: [
        ...this.state.SLIDE_LIST,
        {
          type: 'photo',
          data: acceptedFiles[acceptedFiles.length - 1].name,
          title: '',
          desc: '',
          duration: 3,
          order: this.state.SLIDE_LIST.length + 1
        }
      ]
    })
    //eslint-disable-next-line
    console.log(this.state.SLIDE_LIST)
  }

  handleOnDropRejected = rejectedFiles => {
    alert('This file type is not allowed:' + rejectedFiles[rejectedFiles.length - 1].name)
  }

  render() {
    return (
      <div>
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
        <div className='list'>
          {this.state.SLIDE_LIST.map(item => (
            <div className='element'>{item.data}</div>
          ))}
        </div>
        <style jsx>
          {`
            .upload {
              padding: 20px;
              font-family: "Open Sans", sans-serif;
              text-align: center;
              border-radius: 4px;
              border: 2px dashed #adadad;
              cursor: pointer;
              background: white;
              margin: 40px auto;
              max-width: 640px;
            }

            .list {
              borderwidth: 2;
              borderscolor: black;
            }

            .element {
              margin 10px;
              border: 2px black solid ;
              background: white;
            }
          `}
        </style>
      </div>
    )
  }
}

export default Upload
