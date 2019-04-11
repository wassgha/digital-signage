import React from 'react'

class EmptyWidgetOptions extends React.Component {
  render() {
    return (
      <div className={'widget'}>
        This widget has no options.
        <style jsx>
          {`
            .widget {
              display: flex;
              flex-direction: column;
              justify-content: center;
              text-align: center;
            }
          `}
        </style>
      </div>
    )
  }
}

export default EmptyWidgetOptions
