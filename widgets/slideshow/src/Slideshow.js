/**
 * @fileoverview Slideshow component that given an array of slide descriptions
 * of mixed types, renders the slides and automatically plays the slideshow for
 * the given durations
 */

import React, { Component } from 'react'
import _ from 'lodash'

import GenericSlide from './Slide/Generic'
import PhotoSlide from './Slide/Photo'
import YoutubeSlide from './Slide/Youtube'
import WebSlide from './Slide/Web'
import Progress from './Progress'

import { getSlides } from '../../../actions/slide'

const DEFAULT_DURATION = 5000

class Slideshow extends Component {
  constructor(props) {
    super(props)

    this.slideRefs = []

    this.state = {
      current: null,
      slides: [],
      ready: false
    }
  }

  componentDidMount() {
    const { data } = this.props
    getSlides(data).then(slides => {
      this.setState({ current: 0, slides }, this.waitForNextSlide)
    })
  }

  /**
   * Sorts the slides by the given `order` value of each slide and returns the
   * slides array in the sorted order
   * @return {Array}
   */
  get orderedSlides() {
    const { slides } = this.state
    return _.sortBy(slides, 'order')
  }

  /**
   * Moves to the next slide (and loops back if on the last slide)
   * @return {Promise}
   */
  nextSlide = () => {
    const { current, slides } = this.state
    return new Promise(resolve => {
      this.setState(
        {
          current: (current + 1) % slides.length
        },
        () => {
          const { current } = this.state
          const prev = (((current - 1) % slides.length) + slides.length) % slides.length
          this.slideRefs[prev].stop()
          this.slideRefs[current].play()
          resolve()
        }
      )
    })
  }

  /**
   * Waits for the duration specified by each slide then moves to the next slide
   * and waits again
   */
  waitForNextSlide = () => {
    const { defaultDuration = DEFAULT_DURATION } = this.props
    const { current } = this.state
    const currentSlide = this.orderedSlides[current]
    this.setState({ ready: false }, () => {
      this.slideRefs[current] &&
        this.slideRefs[current].loadedPromise.then(() => {
          this.setState({ ready: true })
          setTimeout(
            () =>
              this.nextSlide().then(() => {
                this.waitForNextSlide()
              }),
            (currentSlide && currentSlide.duration * 1000) || defaultDuration
          )
        })
    })
  }

  getSlideComponent = type => {
    switch (type) {
      case 'photo':
        return PhotoSlide
      case 'youtube':
        return YoutubeSlide
      case 'web':
        return WebSlide
      default:
        return GenericSlide
    }
  }

  renderSlide = (slide, index) => {
    const { current } = this.state
    const { type } = slide

    const SlideComponent = this.getSlideComponent(type)

    return (
      <SlideComponent
        key={index}
        slide={slide}
        show={index == current}
        ref={ref => (this.slideRefs[index] = ref)}
      />
    )
  }

  render() {
    const { defaultDuration = DEFAULT_DURATION } = this.props
    const { current, ready } = this.state
    return (
      <div className='slideshow'>
        <div className='slideshow-wrapper'>
          {this.orderedSlides.map((slide, index) => this.renderSlide(slide, index))}
        </div>
        <Progress
          defaultDuration={defaultDuration}
          current={current}
          orderedSlides={this.orderedSlides}
          ready={ready}
        />
        <style jsx>
          {`
            .slideshow {
              display: block;
              position: relative;
              flex: 1;
              overflow: hidden;
              width: 100%;
              height: 100%;
            }
            .slideshow-wrapper {
              position: relative;
              width: 100%;
              height: 100%;
              overflow: hidden;
            }
          `}
        </style>
      </div>
    )
  }
}

export default Slideshow
