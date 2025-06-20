import React from "react";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.onClickWrapper = this.onClickWrapper.bind(this);
  }

  onClickWrapper(event) {
    const { onClick = () => {} } = this.props;
    return this.setState({ loading: true }, () => {
      onClick(event).then(() => {
        this.setState({ loading: false });
      });
    });
  }

  render() {
    const {
      text = "Submit",
      color = "gray",
      style = { marginLeft: 16 },
    } = this.props;
    const { loading = false } = this.state;
    return (
      <button
        className={"btn"}
        onClick={loading ? () => {} : this.onClickWrapper}
        style={style}
        disabled={loading}
      >
        {loading && (
          <div
            style={{
              height: 16,
              width: 16,
              border: "2px solid #fff",
              borderTop: "2px solid transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              marginRight: 8
            }}
          />
        )}
        {text}
        <style jsx>{`
          .btn {
            font-family: "Open Sans", sans-serif;
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
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </button>
    );
  }
}

export default Button;
