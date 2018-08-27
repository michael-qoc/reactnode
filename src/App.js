import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "./store/actions/actionTypes";
import * as actions from "./store/actions";
import Navbar from "./components/layout/NavbarNew";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import withAsyncRoute from "./components/HOC/withAsyncRoute";

import HomePage from "./components/pages/HomePage";
import UserProfilePage from "./components/pages/UserProfilePage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import NotFoundPage from "./components/pages/NotFoundPage";

//import DashboardPage from './components/pages/DashboardPage'
// Dont import DashboardPage now, use code spliting to import js file asynchronously

//import DoctorPage from "./components/pages/DoctorPage";
// Dont import DoctorPage now, use code spliting to import js file asynchronously

//import NursePage from "./components/pages/NursePage";
// Dont import NursePage now, use code spliting to import js file asynchronously

const asyncDashboard = withAsyncRoute(() => {
  return import("./components/pages/DashboardPage");
});

const asyncDoctorPage = withAsyncRoute(() => {
  return import("./components/pages/DoctorPage");
});

const asyncNursePage = withAsyncRoute(() => {
  return import("./components/pages/NursePage");
});

const mapStateToProps = state => ({
  ...state.auth,
  ...state.articleList
});

const mapDispatchToProps = dispatch => ({
  onResetRedirectPath: () => dispatch({ type: actionTypes.REDIRECT }),
  onGetCurrentAuthStatus: () => dispatch(actions.getCurrentAuthStatus())
});

class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.props.history.replace(nextProps.redirectTo);
      this.props.onResetRedirectPath();
    }
  }

  componentDidMount() {
    this.props.onGetCurrentAuthStatus();
  }
  render() {
    const { currentUser, CSRFToken, getCurrentAuthStatusReady } = this.props;
    let routes = (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/register" component={SignUpPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/user/:username" component={UserProfilePage} />
        <Route component={NotFoundPage} />
        {/*<Redirect to="/"/>*/}
      </Switch>
    );

    if (CSRFToken && Object.keys(currentUser).length > 0) {
      routes = (
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/user/:username" component={UserProfilePage} />
          <Route path="/dashboard" component={asyncDashboard} />
          {currentUser.roleList.indexOf("doctor") > -1 ? (
            <Route path="/doctor-page" component={asyncDoctorPage} />
          ) : null}
          {currentUser.roleList.indexOf("nurse") > -1 ? (
            <Route path="/nurse-page" component={asyncNursePage} />
          ) : null}
          <Route component={NotFoundPage} />
          {/*<Redirect to="/"/>*/}
        </Switch>
      );
    }

    let app = <div>loading...</div>;

    if (getCurrentAuthStatusReady) {
      app = (
        <div>
          <Navbar />
          <div style={{ marginTop: 50 }} />
          <div style={{ minHeight: "80vh" }}>{routes}</div>
          <ScrollToTop />
          <Footer />
          <NotificationContainer />
        </div>
      );
    }

    return app;
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
