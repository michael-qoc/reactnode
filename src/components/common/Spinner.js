import React, { Component } from "react";

class Spinner extends Component {
  render() {
    const { bgColor, minHeight } = this.props;

    return (
      <div
        className="flex-row align-items-center  "
        style={{
          background: bgColor,
          minHeight: minHeight,
          width: "100%"
        }}
      >
        <div className="container text-center text-info">
          <i className="fa fa-spinner fa-spin" style={{ fontSize: 50 }} />
        </div>
      </div>
    );
  }
}

Spinner.defaultProps = {
  bgColor: "white",
  minHeight: 400
};

export default Spinner;
