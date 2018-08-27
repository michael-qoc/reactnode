import React, { Component } from "react";
import SpinnerBanner from "../../common/Banner/SpinnerBanner";
import ComplexBanner from "../../common/Banner/ComplexBanner";
import MainView from "./MainView";
import { connect } from "react-redux";
import GoBack from "../../common/GoBack";
import MyArticlesPage from "../MyArticlesPage";
import * as actions from "../../../store/actions";

const mapStateToProps = state => ({
  userInfo: state.otherUser.profile,
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  onFetchProfile: username => dispatch(actions.fetchProfile(username)),
  onUnload: () => dispatch(actions.profilePageUnloaded())
});

class UserProfilePage extends Component {
  componentDidMount() {
    this.props.onFetchProfile(this.props.match.params.username);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      window.location.reload();
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { userInfo } = this.props;
    return (
      <div>
        {userInfo ? <ComplexBanner userInfo={userInfo} /> : <SpinnerBanner />}
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1 ">
              <GoBack />
            </div>
          </div>

          <MainView userInfo={userInfo} />
          <div className="row">
            <div className="col-md-10 col-md-offset-1 ">
              <MyArticlesPage />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfilePage);
