import { Component } from 'react'
import _ from 'lodash'

import Slide from './Slide'

const DEFAULT_DURATION = 5000

class Slideshow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 0,
      firstRender: true
    }
  }

  componentDidMount() {
    this.waitForNextSlide()
    this.setState({ firstRender: false })
  }

  waitForNextSlide = () => {
    const { defaultDuration = DEFAULT_DURATION } = this.props
    const { current } = this.state
    const currentSlide = this.orderedSlides[current]
    setTimeout(() => {
      this.nextSlide().then(() => {
        this.waitForNextSlide()
      })
    }, currentSlide.duration * 1000 || defaultDuration)
  }

  get orderedSlides() {
    const { slides = [] } = this.props
    return _.sortBy(slides, 'order')
  }

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

  goToSlide = n => {
    const { slides } = this.state
    if (n < 0 || n > slides.length - 1) {
      return
    }

    this.setState(() => ({
      current: n
    }))
  }

  render() {
    const { defaultDuration = DEFAULT_DURATION } = this.props
    const { current, firstRender } = this.state
    const currentSlide = this.orderedSlides[current]
    return (
      <div className="slideshow">
        <div className="slideshow-wrapper">
          <Slide key={current} slide={currentSlide} />
        </div>
        <div className="progress-bar">
          {this.orderedSlides.map((slide, i) => (
            <div className={`progress-segment ${i < current && 'active'}`}>
              <div
                className={`progress-segment-content`}
                style={{
                  width: i == current && !firstRender ? '100%' : '0%',
                  transition:
                    i == current
                      ? `all linear ${slide.duration || defaultDuration / 1000}s`
                      : 'none'
                }}
              />
            </div>
          ))}
        </div>
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
            .progress-segment {
              height: 4px;
              border-radius: 4px;
              background: rgba(255, 255, 255, 0.4);
              margin: 2px;
              flex: 1;
            }
            .progress-segment.active {
              background: white;
            }
            .progress-segment-content {
              width: 0%;
              height: 100%;
              border-radius: 4px;
              background: white;
              transition: all linear 5s;
            }
            .progress-bar {
              display: flex;
              flex-direction: row;
              width: 100%;
              position: absolute;
              bottom: 0;
              left: 0;
            }
          `}
        </style>
      </div>
    )
  }
}

export default Slideshow
