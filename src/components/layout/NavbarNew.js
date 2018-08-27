import React, { Component, Fragment } from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import classnames from "classnames";

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actions.logout())
});

class Header extends Component {
  state = {
    open: false
  };
  toggleNavbar = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };
  closeNav = () => {
    this.setState({ open: false });
  };
  onLogout = () => {
    this.props.onLogout();
    this.setState({ open: false });
  };
  onGoToDashboard = () => {
    this.props.history.push("/dashboard/settings");
    this.setState({ open: false });
  };

  onGoToSettings = () => {
    this.props.history.push("/dashboard/settings");
    this.setState({ open: false });
  };
  render() {
    const { CSRFToken, currentUser } = this.props;
    const authLink = (
      <Fragment>
        <button
          onClick={this.onLogout}
          className=" btn  btn-inherit custom-navbtn  navbar-right navbar-btn "
        >
          Log out
        </button>
        <ButtonToolbar className="navbar-right ">
          <DropdownButton
            className=" navbar-btn btn  btn-inherit custom-navbtn"
            title="Dashboard"
            id="dropdown-size-medium"
          >
            <MenuItem onClick={this.onGoToDashboard} eventKey="1">
              <span className="text-dark">Dashboard</span>
            </MenuItem>
            <MenuItem divider />
            <MenuItem onClick={this.onGoToSettings} eventKey="2">
              <span className="text-dark">Account Settings</span>
            </MenuItem>
          </DropdownButton>
        </ButtonToolbar>

        <Link
          to={`/user/${this.props.currentUser.username}`}
          style={{ position: "relative" }}
          className=" navbar-right navbar-btn"
        >
          <img
            src={this.props.currentUser.image}
            className="avatar "
            style={{
              height: 30,
              width: 30,
              position: "absolute",
              top: 2,
              right: 10
            }}
            alt={this.props.currentUser.username}
            title={this.props.currentUser.username}
          />
        </Link>
      </Fragment>
    );

    const guestLink = (
      <Fragment>
        <Link
          to="/login"
          className=" btn  btn-inherit  navbar-right navbar-btn "
        >
          Log in
        </Link>

        <Link
          to="/register"
          className="btn  btn-inherit   navbar-right  navbar-btn"
        >
          Sign up
        </Link>
      </Fragment>
    );

    return (
      <nav className="navbar navbar-default navbar-fixed-top  ">
        <div className="container">
          <div className="navbar-header">
            <button
              onClick={this.toggleNavbar}
              type="button"
              style={{
                minWidth: 44,
                fontSize: 20,
                padding: "3px 5px"
              }}
              className="navbar-toggle collapsed btn-inherit"
            >
              <span className="sr-only">Toggle navigation</span>
              {this.state.open ? (
                <i className="fas fa-times" />
              ) : (
                <i className="fas fa-bars" />
              )}
            </button>
            <NavLink
              className="navbar-brand"
              to="/"
              activeClassName="active"
              style={{ fontWeight: 700 }}
            >
              React & Node
            </NavLink>
            {CSRFToken &&
            Object.keys(currentUser).length > 0 &&
            currentUser.roleList.indexOf("doctor") > -1 ? (
              <NavLink
                className="navbar-brand"
                to="/doctor-page"
                activeClassName="active"
                style={{ fontWeight: 500, fontSize: 16 }}
              >
                Doctor
              </NavLink>
            ) : null}
            {CSRFToken &&
            Object.keys(currentUser).length > 0 &&
            currentUser.roleList.indexOf("nurse") > -1 ? (
              <NavLink
                className="navbar-brand"
                to="/nurse-page"
                activeClassName="active"
                style={{ fontWeight: 500, fontSize: 16 }}
              >
                Nurse
              </NavLink>
            ) : null}
          </div>

          <div
            className={classnames({
              "collapse navbar-collapse": !this.state.open
            })}
          >
            {CSRFToken && Object.keys(currentUser).length > 0
              ? authLink
              : guestLink}
          </div>
        </div>
      </nav>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
