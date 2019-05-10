/**
 * @fileoverview Slide component that given a slide type and its data renders it
 * along with its title and description.
 */

import GenericSlide from './Generic'
import React from 'react'

class PhotoSlide extends GenericSlide {
  constructor(props) {
    super(props)

    this.image = React.createRef()
  }

  componentDidMount() {
    if (this.image && this.image.current && this.image.current.complete) {
      this.handleImageLoaded()
    }
  }

  handleImageLoaded = () => {
    this.state.loading.resolve
      ? this.state.loading.resolve()
      : this.setState({ loading: { promise: Promise.resolve() } })
  }

  handleImageErrored = () => {
    this.state.loading.reject
      ? this.state.loading.reject()
      : this.setState({ loading: { promise: Promise.reject() } })
  }

  /**
   * Renders the inner content of the slide (ex. the photo, youtube iframe, etc)
   * @param {string} data The slide's data (usually a URL or object ID)
   * @returns {Component}
   */
  renderSlideContent(data) {
    return (
      <div className='slide-content'>
        <div
          className='photocover'
          style={{
            backgroundImage: `url(${data})`
          }}
        />
        <div
          className='photo'
          style={{
            backgroundImage: `url(${data})`
          }}
        />
        <img
          src={data}
          className='invisible'
          onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageErrored.bind(this)}
          ref={this.image}
        />
        <style jsx>{`
          .slide-content {
            width: 100%;
            height: 100%;
            background-color: #212121;
            position: relative;
          }
          .photocover {
            width: 110%;
            height: 110%;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 50% 50%;
            filter: blur(20px);
            position: absolute;
            top: -5%;
            left: -5%;
          }
          .photo {
            width: 100%;
            height: 100%;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: 50% 50%;
            position: absolute;
            top: 0;
            left: 0;
          }
          .invisible {
            width: 1px;
            height: 1px;
            display: none;
            visibility: hidden;
          }
        `}</style>
      </div>
    )
  }

  /**
   * Stops the slide's content from playing when the slide is out of focus
   */
  stop = () => {}

  /**
   * Starts or resumes the slide's content when the slide is in focus
   */
  play = () => {}
}

export default PhotoSlide
