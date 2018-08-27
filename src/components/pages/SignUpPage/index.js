import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import classnames from "classnames";
import GoBack from "../../common/GoBack";
import SimpleBanner from "../../common/Banner/SimpleBanner";
import Checkbox from "antd/lib/checkbox";
import "antd/lib/checkbox/style/css";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["doctor", "nurse"];
const defaultCheckedList = [];

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  onRegister: (authData, callback) =>
    dispatch(actions.register(authData, callback))
});

class SignUpPage extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
    checkedList: defaultCheckedList,
    indeterminate: false,
    checkAll: false
  };

  onChange = checkedList => {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length
    });
  };

  onCheckAllChange = e => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
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
        username: this.state.username,
        password: this.state.password,
        password2: this.state.password2,
        roleList: this.state.checkedList
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

    this.props.onRegister(authData, callback);
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
                background: "white"
              }}
            >
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your React & Node account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.username
                    })}
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.updateState("username")}
                  />
                  {errors.username && (
                    <p>
                      <small style={{ color: "red", marginTop: 0 }}>
                        {errors.username}
                      </small>
                    </p>
                  )}
                </div>
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
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.updateState("password2")}
                  />
                  {errors.password2 && (
                    <p>
                      <small style={{ color: "red", marginTop: 0 }}>
                        {errors.password2}
                      </small>
                    </p>
                  )}
                </div>

                <p className="lead text-center">
                  Please Select Your Role (Optional)
                </p>
                <div>
                  <div style={{ borderBottom: "1px solid #E9E9E9" }}>
                    <Checkbox
                      indeterminate={this.state.indeterminate}
                      onChange={this.onCheckAllChange}
                      checked={this.state.checkAll}
                    >
                      Check all
                    </Checkbox>
                  </div>
                  <br />
                  <CheckboxGroup
                    options={plainOptions}
                    value={this.state.checkedList}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  disabled={this.props.inProgress}
                  style={{ margin: "30px auto 20px auto" }}
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
)(SignUpPage);
