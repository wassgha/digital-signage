/**
 * @fileoverview Slide component that given a slide type and its data renders it
 * along with its title and description.
 */

import GenericSlide from './Generic'
import React from 'react'
import dynamic from 'next/dynamic'

const DesignerPreviewWithNoSSR = dynamic(() => import('react-designer').then(mod => mod.Preview), {
  ssr: false
})

class FreeformSlide extends GenericSlide {
  componentDidMount() {
    this.state.loading.resolve()
  }

  /**
   * Renders the inner content of the slide (ex. the photo, youtube iframe, etc)
   * @param {string} rawData The slide's data (usually a URL or object ID)
   * @returns {Component}
   */
  renderSlideContent(rawData) {
    let data
    try {
      data = JSON.parse(rawData)
    } catch {
      data = []
    }
    return (
      <div className='slide-content'>
        {DesignerPreviewWithNoSSR ? (
          <DesignerPreviewWithNoSSR objects={data} height={'100%'} width={'100%'} />
        ) : (
          <div />
        )}
        <style jsx>{`
          .slide-content {
            width: 100%;
            height: 100%;
            background-color: #212121;
            position: relative;
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

export default FreeformSlide
