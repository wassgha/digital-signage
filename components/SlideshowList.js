import { Component } from 'react'
import React from 'react'
import SlideshowCard from './SlideshowCard'

import { getSlideshows } from '../actions/slideshow'

class SlideshowList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      slideshows: []
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
        {slideshows.map((value, index) => (
          <SlideshowCard key={`item-${index}`} index={index} value={value} refresh={this.refresh} />
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
