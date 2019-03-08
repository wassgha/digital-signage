import { Component } from "react"
import React from "react"
import Dropzone from "react-dropzone"
import axios from "axios"

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      SLIDE_LIST: []
    }
  }

  handleOnDrop = (acceptedfiles, rejectedFiles) => {
    //eslint-disable-next-line
    console.log("accepted" + acceptedfiles)
    //eslint-disable-next-line
    console.log("rejected" + rejectedFiles)
  }

  handleOnDropAccepted = acceptedFiles => {
    /* eslint-disable */

    var formData = new FormData()
    formData.append("data", acceptedFiles[acceptedFiles.length - 1])
    axios.post("/api/slide/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })

    this.setState({
      SLIDE_LIST: [
        ...this.state.SLIDE_LIST,
        {
          type: "photo",
          data: acceptedFiles[acceptedFiles.length - 1].fullpath,
          title: "",
          desc: "",
          duration: 3,
          order: this.state.SLIDE_LIST.length + 1
        }
      ]
    })
    console.log(this.state.SLIDE_LIST)
    /* eslint-enable */
  }

  handleOnDropRejected = rejectedFiles => {
    alert("This file type is not allowed:" + rejectedFiles[rejectedFiles.length - 1].name)
  }

  render() {
    return (
      <div>
        <Dropzone
          onDrop={this.handleOnDrop}
          accept="image/*"
          onDropAccepted={this.handleOnDropAccepted}
          onDropRejected={this.handleOnDropRejected}
          multiple={false}
        >
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop files here...</p>
                ) : (
                  <p>Try dropping some files here, or click to select files to upload.</p>
                )}
              </div>
            )
          }}
        </Dropzone>
        <div>
          {this.state.SLIDE_LIST.map(item => (
            <div>{item.data}</div>
          ))}
        </div>
      </div>
    )
  }
}

export default Upload
