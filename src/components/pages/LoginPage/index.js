import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import * as actions from "../../../store/actions";
import GoBack from "../../common/GoBack";
import SimpleBanner from "../../common/Banner/SimpleBanner";

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  onLogin: (authData, callback) => dispatch(actions.login(authData, callback))
});

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  updateState = field => ev => {
    const state = this.state;
    const newState = Object.assign({}, state, { [field]: ev.target.value });

    this.setState(newState);
  };
  onSubmit = e => {
    e.preventDefault();
    const authData = {
      user: {
        email: this.state.email,
        password: this.state.password
      }
    };
    const callback = username => {
      const router = this.props.match.params.route;
      if (router) {
        // push to previous page
        this.props.history.push(`/${router}`);
      } else {
        // push to default page
        this.props.history.push(`/user/${username}`);
      }
    };

    this.props.onLogin(authData, callback);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <SimpleBanner />
        <div className="container">
          <div className="row">
            <div
              className="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3"
              style={{ padding: 0 }}
            >
              <GoBack />
            </div>
          </div>
          <div className="row">
            <div
              className="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3 border-shadow border-radius"
              style={{
                padding: 20,
                background: "white",
                border: "1px solid #ddd"
              }}
            >
              <h1 className=" text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your React & Node account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.updateState("email")}
                  />
                  {errors.email && (
                    <p>
                      <small style={{ color: "red", marginTop: 0 }}>
                        {errors.email}
                      </small>
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.updateState("password")}
                  />
                  {errors.password && (
                    <p>
                      <small style={{ color: "red", marginTop: 0 }}>
                        {errors.password}
                      </small>
                    </p>
                  )}
                </div>
                <button
                  style={{ margin: "30px auto 20px auto" }}
                  disabled={this.props.inProgress}
                  className="btn btn-success btn-lg btn-block "
                >
                  Submit
                </button>
              </form>
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
)(LoginPage);
