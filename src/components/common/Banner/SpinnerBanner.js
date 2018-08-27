import React, { Component } from "react";

class SpinnerBanner extends Component {
  render() {
    const { mBottom } = this.props;

    return (
      <div
        className="flex-row align-items-center  banner  "
        style={{ marginBottom: mBottom }}
      >
        <div className="container text-center">
          <i className="fa fa-spinner fa-spin" style={{ fontSize: 50 }} />
        </div>
      </div>
    );
  }
}

SpinnerBanner.defaultProps = {
  mBottom: 30
};

export default SpinnerBanner;
