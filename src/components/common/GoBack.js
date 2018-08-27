import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class GoBack extends Component {
  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div style={{ marginBottom: 20 }}>
        <button onClick={this.goBack} className="btn btn-primary">
          Go Back
        </button>
      </div>
    );
  }
}
export default withRouter(GoBack);
