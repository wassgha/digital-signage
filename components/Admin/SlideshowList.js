import { Component } from 'react'
import React from 'react'
import ContentLoader from 'react-content-loader'

import SlideshowCard from './SlideshowCard'

import { getSlideshows } from '../../actions/slideshow'

class SlideshowList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      slideshows: null
    }
  }

  componentDidMount() {
    getSlideshows().then(slideshows => {
      this.setState({
        slideshows
      })
    })
  }

  refresh = () => {
    getSlideshows().then(slideshows => {
      this.setState({
        slideshows
      })
    })
  }

  render() {
    const { slideshows } = this.state
    return (
      <div className={'list'}>
        {slideshows
          ? slideshows.map((value, index) => (
              <SlideshowCard
                key={`item-${index}`}
                index={index}
                value={value}
                refresh={this.refresh}
              />
            ))
          : Array(4)
              .fill()
              .map(() => (
                <ContentLoader height={120} width={640}>
                  <rect x='0' y='0' rx='5' ry='5' width='100%' height='80' />
                </ContentLoader>
              ))}
        <style jsx>
          {`
            .list {
              position: relative;
            }
          `}
        </style>
      </div>
    )
  }
}

export default SlideshowList
