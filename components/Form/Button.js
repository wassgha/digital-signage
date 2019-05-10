import React from 'react'
import Lottie from 'react-lottie'

class Button extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  onClickWrapper = event => {
    const { onClick = () => {} } = this.props
    return this.setState({ loading: true }, () => {
      onClick(event).then(() => {
        this.setState({ loading: false })
      })
    })
  }

  render() {
    const { text = 'Submit', color = 'gray', style = { marginLeft: 16 } } = this.props
    const { loading = false } = this.state
    return (
      <button
        className={'btn'}
        onClick={loading ? () => {} : this.onClickWrapper}
        style={style}
        disabled={loading}
      >
        {loading && (
          <Lottie
            height={32}
            width={32}
            style={{ margin: 0 }}
            options={{
              loop: true,
              autoplay: true,
              animationData: require('./assets/loading.json'),
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }}
          />
        )}
        {text}
        <style jsx>{`
          .btn {
            font-family: 'Open Sans', sans-serif;
            background: lightgray;
            text-decoration: none;
            text-transform: uppercase;
            color: white;
            font-size: 14px;
            border-radius: 4px;
            border: none;
            display: inline-flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 16px;
            padding-left: 24px;
            padding-right: 24px;
            outline: none;
            background: ${color};
            cursor: pointer;
          }
        `}</style>
      </button>
    )
  }
}

export default Button
