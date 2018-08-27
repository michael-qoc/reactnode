import React, { Component } from "react";
import Settings from "./Settings";
import { connect } from "react-redux";
import { Route, NavLink } from "react-router-dom";

const mapStateToProps = state => ({
  ...state.auth
});

class DashboardPage extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.match.isExact) {
      this.setState({ open: false });
    }
  }

  render() {
    const MySettings = props => {
      return <Settings {...props} />;
    };

    return (
      <div style={{ marginTop: 80 }}>
        <section className="dashboard__main">
          <div className="container">
            <div className="row">
              <div className="col-sm-3">
                <div className="list-group">
                  <a href="javascript:void(0)" className="list-group-item ">
                    <span>
                      <i className="fa fa-gear" />
                    </span>
                    &nbsp; Dashboard
                  </a>

                  <NavLink
                    to="/dashboard/settings"
                    exact
                    activeClassName="active"
                    className="list-group-item"
                  >
                    <span>
                      <i className=" fas fa-user-cog" />
                      &nbsp;Account&nbsp;Settings
                    </span>
                  </NavLink>

                  <NavLink
                    to={`/user/${this.props.currentUser.username}`}
                    exact
                    activeClassName="active"
                    className="list-group-item"
                  >
                    <span>
                      <i className="fa fa-user" />
                      &nbsp;
                    </span>
                    My PublicPage
                  </NavLink>
                </div>
              </div>

              <div className="col-sm-9">
                <Route
                  path={this.props.match.path + "/settings"}
                  component={MySettings}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default connect(mapStateToProps)(DashboardPage);
