import { Component } from 'react'
import React from 'react'
import ContentLoader from 'react-content-loader'

import ScreenCard from './ScreenCard'

import { getDisplays } from '../../actions/display'

class ScreenList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      screens: null
    }
  }

  componentDidMount() {
    this.refresh()
  }

  refresh = () => {
    getDisplays().then(screens => {
      this.setState({
        screens
      })
    })
  }

  render() {
    const { screens } = this.state
    return (
      <div className={'list'}>
        {screens
          ? screens.map((value, index) => (
              <ScreenCard
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

export default ScreenList
