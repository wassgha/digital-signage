/**
 * @fileoverview Slideshow component that given an array of slide descriptions
 * of mixed types, renders the slides and automatically plays the slideshow for
 * the given durations
 */

import { Component } from 'react'
import _ from 'lodash'

import Slide from './Slide'
import Progress from './Progress'

const DEFAULT_DURATION = 5000

class Slideshow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      current: null
    }
  }

  componentDidMount() {
    this.setState({ current: 0 }, this.waitForNextSlide)
  }

  /**
   * Sorts the slides by the given `order` value of each slide and returns the
   * slides array in the sorted order
   * @return {Array}
   */
  get orderedSlides() {
    const { slides = [] } = this.props
    return _.sortBy(slides, 'order')
  }

  /**
   * Moves to the next slide (and loops back if on the last slide)
   * @return {Promise}
   */
  nextSlide = () => {
    const { current } = this.state
    const { slides } = this.props
    return new Promise(resolve => {
      this.setState(
        {
          current: (current + 1) % slides.length
        },
        resolve
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
    setTimeout(() => {
      this.nextSlide().then(() => {
        this.waitForNextSlide()
      })
    }, (currentSlide && currentSlide.duration * 1000) || defaultDuration)
  }

  render() {
    const { defaultDuration = DEFAULT_DURATION } = this.props
    const { current } = this.state
    const currentSlide = this.orderedSlides[current]
    return (
      <div className="slideshow">
        <div className="slideshow-wrapper">
          {currentSlide && <Slide key={current} slide={currentSlide} />}
        </div>
        <Progress
          defaultDuration={defaultDuration}
          current={current}
          orderedSlides={this.orderedSlides}
        />
        <style jsx>
          {`
            .slideshow {
              display: block;
              position: relative;
              flex: 1;
              overflow: hidden;
            }
            .slideshow-wrapper {
              position: relative;
              width: 100%;
              height: 100%;
            }
          `}
        </style>
      </div>
    )
  }
}

export default Slideshow
