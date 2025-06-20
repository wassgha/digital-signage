import { Component } from 'react'
import React from 'react'
import ContentLoader from 'react-content-loader'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { arrayMoveImmutable as arrayMove } from 'array-move'

import SlideCard from './SlideCard'

import { getSlides } from '../../actions/slide'
import { reorderSlides } from '../../actions/slideshow'

const SortableItem = SortableElement(SlideCard)

const SortableList = SortableContainer(({ items, refresh }) => {
  return (
    <div className={'list'}>
      <div className={'timeline'} />
      {items.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          id={index}
          value={value}
          refresh={refresh}
        />
      ))}
      <style jsx>
        {`
          .list {
            position: relative;
          }
          .timeline {
            width: 4px;
            height: calc(100% - 20px);
            border-radius: 2px;
            position: absolute;
            left: 50%;
            top: 10px;
            margin-left: -2px;
            background: #cccccc;
            z-index: 0;
          }
        `}
      </style>
    </div>
  )
})

class SlideList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      slides: null
    }
  }

  componentDidMount() {
    const { slideshow } = this.props
    getSlides(slideshow).then(slides => {
      this.setState({
        slides: slides
      })
    })
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { slideshow } = this.props
    this.setState(
      {
        slides: [...arrayMove(this.state.slides, oldIndex, newIndex)]
      },
      () => {
        reorderSlides(slideshow, oldIndex, newIndex)
      }
    )
  }

  refresh = () => {
    const { slideshow } = this.props
    return getSlides(slideshow).then(slides => {
      return this.setState({
        slides: slides
      })
    })
  }

  render() {
    const { slides } = this.state
    return slides ? (
      <SortableList
        items={slides}
        refresh={this.refresh}
        onSortEnd={this.onSortEnd}
        distance={2}
        lockAxis='y'
      />
    ) : (
      Array(4)
        .fill()
        .map((i, index) => (
          <ContentLoader height={120} width={640} key={`loading-${index}`}>
            <rect x='0' y='0' rx='5' ry='5' width='100%' height='100' />
          </ContentLoader>
        ))
    )
  }
}

export default SlideList
