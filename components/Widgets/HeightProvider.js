import ReactDOM from 'react-dom'
import React from 'react'

/*
 * A simple HOC that provides facility for listening to container resizes.
 */
export default function HeightProvider(ComposedComponent, MeasureComponent, layout = 'spaced') {
  return class HeightProvider extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        width: 1280,
        height: 720
      }

      this.mounted = false
    }

    componentDidMount() {
      this.mounted = true

      window.addEventListener('resize', this.onWindowResize)
      this.onWindowResize()
    }

    componentWillUnmount() {
      this.mounted = false
      window.removeEventListener('resize', this.onWindowResize)
    }

    onWindowResize = () => {
      if (!this.mounted) return
      // eslint-disable-next-line
      const node = ReactDOM.findDOMNode(MeasureComponent)
      if (node instanceof HTMLElement) {
        this.setState({ width: node.offsetWidth, height: node.offsetHeight })
      }
    }

    render() {
      const { measureBeforeMount = false, ...rest } = this.props
      if (measureBeforeMount && !this.mounted) {
        return <div className={this.props.className} style={this.props.style} />
      }

      const rowNum =
        Math.max.apply(
          Math,
          rest.layout.map(widget => {
            return widget.y + widget.h
          })
        ) || 12

      const colNum =
        Math.max.apply(
          Math,
          rest.layout.map(widget => {
            return widget.x + widget.w
          })
        ) || 12

      return (
        <ComposedComponent
          {...rest}
          {...{
            width: this.state.width,
            rowHeight: this.state.height / rowNum - (layout == 'spaced' ? 10 : 0),
            cols: colNum
          }}
        />
      )
    }
  }
}
