import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { NotificationManager } from "react-notifications";

const createNotification = type => {
  return () => {
    switch (type) {
      case "follow":
        NotificationManager.success(
          "You followed this user successfully",
          "Success",
          4000
        );
        break;

      case "unfollow":
        NotificationManager.success(
          "You unfollowed this user successfully",
          "Success",
          4000
        );
        break;

      case "error":
        NotificationManager.warning(
          "You must login to follow an user!",
          "Error",
          4000
        );
        break;
    }
  };
};

const mapStateToProps = state => ({
  ...state.auth,
  ...state.otherUser
});

const mapDispatchToProps = dispatch => ({
  onFollow: (token, username, callback) =>
    dispatch(actions.followProfile(token, username, callback)),
  onUnfollow: (token, username, callback) =>
    dispatch(actions.unfollowProfile(token, username, callback))
});

class FollowMe extends Component {
  handleClick = ev => {
    ev.preventDefault();
    if (!this.props.token) {
      return createNotification("error")();
    }

    if (this.props.user.following) {
      this.props.onUnfollow(
        this.props.token,
        this.props.user.username,
        createNotification("unfollow")
      );
    } else {
      this.props.onFollow(
        this.props.token,
        this.props.user.username,
        createNotification("follow")
      );
    }
  };
  render() {
    const { user } = this.props;
    const buttonWords = (
      <Fragment>
        <span>
          {user.following ? (
            "Unfollow"
          ) : (
            <span>
              <i className="fas fa-plus" />
              &nbsp;
              {"Follow"}
            </span>
          )}
        </span>
        <span>
          &nbsp;
          {user.username}
        </span>
      </Fragment>
    );
    return (
      <button
        className="btn btn-sm btn-outline btn-success"
        onClick={this.handleClick}
        disabled={this.props.inProgress}
        style={{ marginTop: 10, minWidth: 130 }}
      >
        {!this.props.inProgress ? (
          buttonWords
        ) : (
          <i className="fa fa-spinner fa-spin" />
        )}
      </button>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowMe);
