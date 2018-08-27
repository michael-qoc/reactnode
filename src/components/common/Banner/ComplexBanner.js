import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../../store/actions";

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  CSRFToken: state.auth.CSRFToken
});

const mapDispatchToProps = dispatch => ({
  onUnload: () => dispatch(actions.profilePageUnloaded())
});

const EditProfileSettings = props => {
  return (
    <Link
      to="/dashboard/settings"
      className="btn btn-sm btn-outline btn-success"
      style={{ marginBottom: 20, marginTop: 10 }}
    >
      <i className="ion-gear-a" /> Edit Account Settings
    </Link>
  );
};

class ComplexBanner extends Component {
  componentWillUnmount() {
    this.props.onUnload();
  }
  render() {
    const { userInfo, mBottom } = this.props;

    const isUser =
      this.props.CSRFToken &&
      userInfo.username === this.props.currentUser.username;
    return (
      <div
        className="flex-row align-items-center  banner "
        style={{ marginBottom: mBottom }}
      >
        <div className="container text-center">
          <Link to={`/user/${userInfo.username}`}>
            <img
              src={userInfo.image}
              className="avatar"
              alt="alt"
              style={{ width: 70, height: 70, marginTop: 20 }}
            />
          </Link>
          <h4>
            <Link
              to={`/user/${userInfo.username}`}
              style={{ color: "white", textDecoration: "none" }}
            >
              <span>{userInfo.username}</span>
            </Link>
          </h4>

          {isUser ? <EditProfileSettings /> : null}
        </div>
      </div>
    );
  }
}

ComplexBanner.defaultProps = {
  mBottom: 30
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComplexBanner);
