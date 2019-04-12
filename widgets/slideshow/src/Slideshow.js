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

const DEFAULT_DURATION = 5000

/* eslint-disable */
const DEFAULT_SLIDES = [
  {
    type: 'photo',
    data:
      'https://compsci.lafayette.edu/wp-content/uploads/sites/66/2010/05/computerSci-homepage.jpg',
    title: 'Welcome to the Computer Science Department',
    desc:
      'Welcome to the fifth floor of the Acopian Engineering Center, home of the Computer Science department!',
    duration: 3, // In seconds
    order: 2
  },
  {
    type: 'photo',
    data:
      'https://news.lafayette.edu/wp-content/blogs.dir/2/files/2018/12/STEM-professors-470x264.jpg',
    title: 'Hidden Figures Week',
    desc:
      'Hidden Figures Week explored issues related to women in STEM through a roundtable faculty discussion.',
    duration: 2, // In seconds
    order: 1
  },
  {
    type: 'web',
    data: 'https://compsci.lafayette.edu/courses/',
    title: 'Classes Website Example',
    desc: '',
    duration: 4, // In seconds
    order: 3
  },

  {
    type: 'youtube',
    data: 'https://www.youtube.com/watch?v=xcs-xnc25-I',
    title: "The President's Challenge: Bring the Best",
    desc:
      "Saeed Malami '20 and Lillian Kennedy '21 talk about the impact Lafayette College has had on their lives and the role donors have played in making this possible.",
    duration: 10, // In seconds
    order: 4
  }
]
/* eslint-enable */

class Slideshow extends Component {
  constructor(props) {
    super(props)

    this.slideRefs = []

    this.state = {
      current: null,
      ready: false
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
    const { data = DEFAULT_SLIDES } = this.props
    return _.sortBy(data, 'order')
  }

  /**
   * Moves to the next slide (and loops back if on the last slide)
   * @return {Promise}
   */
  nextSlide = () => {
    const { current } = this.state
    const { data = DEFAULT_SLIDES } = this.props
    return new Promise(resolve => {
      this.setState(
        {
          current: (current + 1) % data.length
        },
        () => {
          const { current } = this.state
          const prev = (((current - 1) % data.length) + data.length) % data.length
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
