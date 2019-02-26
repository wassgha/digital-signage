import { Component } from 'react'
import getVideoId from 'get-video-id'

class Slide extends Component {
  renderSlideContent(type, data) {
    switch (type) {
      case 'photo':
        return (
          <div
            className="slide-content photo"
            style={{
              backgroundImage: `url(${data})`
            }}
          >
            <style jsx>{`
              .slide-content.photo {
                width: 100%;
                height: 100%;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: 50% 50%;
              }
            `}</style>
          </div>
        )
      case 'youtube':
        const { id, service } = getVideoId(data)
        if (id && service == 'youtube') {
          return (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${id}?autoplay=1&controls=0&start=18`}
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          )
        }
      case 'web':
        return (
          <iframe
            width="100%"
            height="100%"
            src={data}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        )
      default:
        return (
          <div className="slide-content unknown">
            <style jsx>{`
              .slide-content.unknown {
                width: 100%;
                height: 100%;
                background: #ebebeb;
              }
            `}</style>
          </div>
        )
    }
  }

  render() {
    const { slide } = this.props
    const { url, type, title, desc } = slide
    return (
      <div className="slide">
        {this.renderSlideContent(type, url)}
        {(title || desc) && (
          <div className="info">
            {title && <h1>{title}</h1>}
            {desc && <p>{desc}</p>}
          </div>
        )}
        <style jsx>{`
          .info {
            width: 100%;
            position: absolute;
            bottom: 0;
            padding: 10px;
            background-image: linear-gradient(
              -180deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0.5) 100%
            );
            box-sizing: border-box;
            padding-top: 40px;
            pointer-events: none;
          }
          .info h1 {
            margin: 0;
            margin-bottom: 10px;
            color: #ffffff;
            font-family: Open Sans, sans-serif;
            font-weight: 700;
            font-size: 22px;
            text-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
          }
          .info p {
            margin: 0;
            margin-bottom: 10px;
            color: #ffffff;
            font-family: Open Sans, sans-serif;
            font-weight: 400;
            font-size: 16px;
            flex: 1;
            text-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
          }
          .slide {
            display: inline-block;
            height: 100%;
            width: 100%;
            position: absolute;
          }
        `}</style>
      </div>
    )
  }
}

export default Slide
