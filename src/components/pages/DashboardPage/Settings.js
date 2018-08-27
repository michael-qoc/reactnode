import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import * as actions from "../../../store/actions";
import GoBack from "../../common/GoBack";
import RadioInputGroup from "../../common/form/RadioInputGroup";
import DateFieldGroup from "../../common/form/DateFieldGroup";
import PlaceInputGroup from "../../common/form/PlaceInputGroup";
import { reduxForm, Field } from "redux-form";
import moment from "moment";
import Script from "react-load-script";
import { NotificationManager } from "react-notifications";
import TextFieldGroup from "../../common/form/TextFieldGroup";
import TextAreaFieldGroup from "../../common/form/TextAreaFieldGroup";
import Popover from "react-bootstrap/lib/Popover";
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import "react-select/dist/react-select.css";
import Select from "react-select";

const interests = [
  { label: "Drinks", value: "drinks" },
  { label: "Culture", value: "culture" },
  { label: "Film", value: "film" },
  { label: "Food", value: "food" },
  { label: "Music", value: "music" },
  { label: "Travel", value: "travel" }
];

const mapStateToProps = state => ({
  ...state.auth,
  initialValues: {
    bio: state.auth.currentUser.bio,
    birthDate: state.auth.currentUser.birthDate,
    city: state.auth.currentUser.city,
    status: state.auth.currentUser.status,
    occupation: state.auth.currentUser.occupation,
    origin: state.auth.currentUser.origin,
    gender: state.auth.currentUser.gender
  }
});

const mapDispatchToProps = dispatch => ({
  onUpdateUser: (authData, callback) =>
    dispatch(actions.updateUser(authData, callback))
});

class Settings extends Component {
  state = {
    errors: {},
    scriptLoaded: false,
    hint: false,
    display: false,
    image: this.props.currentUser.image,
    password: "",
    password2: "",
    interests: this.props.currentUser.interests
  };

  handleSelectChange = value => {
    this.setState({ interests: value });
  };

  handleScriptLoad = () => {
    this.setState({ scriptLoaded: true });
  };
  createNotification = type => {
    return () => {
      switch (type) {
        case "success":
          NotificationManager.success(
            "Account Settings Updated!",
            "Success",
            4000
          );
          break;
        case "warning":
          NotificationManager.warning(
            "Account Settings Updating failed",
            "Error",
            4000
          );
          break;
        default:
          return null;
      }
    };
  };

  // componentWillReceiveProps(nextProps) {
  //   if (
  //     typeof nextProps.errors === "object" &&
  //     Object.keys(nextProps.errors).length > 0
  //   ) {
  //     this.setState({ display: true, errors: nextProps.errors });
  //     console.log("errors", nextProps.errors);
  //     this.createNotification("warning")();
  //   }
  //   if (!isEqual(nextProps.currentUser, this.props.currentUser)) {
  //     this.createNotification("success")();
  //   }
  // }

  // IMPORTANT!!!! NEVER setState inside componentDidUpdate !!!!
  // Do not do this!

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     typeof this.props.errors === "object" &&
  //     Object.keys(this.props.errors).length > 0
  //   ) {
  //     this.setState({ display: true, errors: this.props.errors });
  //     console.log("errors", this.props.errors);
  //     this.createNotification("warning")();
  //   }
  //   if (!isEqual(this.props.currentUser, prevProps.currentUser)) {
  //     this.createNotification("success")();
  //   }
  // }

  static getDerivedStateFromProps(props, state) {
    if (
      typeof props.errors === "object" &&
      Object.keys(props.errors).length > 0
    ) {
      //this.createNotification("warning")();
      return { display: true, errors: props.errors };
    }

    // Return null to indicate no change to state.
    return null;
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     typeof this.props.errors === "object" &&
  //     Object.keys(this.props.errors).length > 0
  //     //!isEqual(this.props.errors, prevProps.errors)
  //   ) {
  //     this.createNotification("warning")();
  //     console.log(this.props.errors);

  //     console.log(prevProps.errors);
  //   }
  // }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (
  //     typeof nextProps.errors === "object" &&
  //     Object.keys(nextProps.errors).length > 0
  //   ) {
  //     this.setState({ display: true, errors: nextProps.errors });
  //     //console.log("errors", nextProps.errors);
  //     this.createNotification("warning")();
  //   }
  //   if (!isEqual(nextProps.currentUser, this.props.currentUser)) {
  //     this.createNotification("success")();
  //   }
  // }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // uploadWidget = () => {
  //   window.cloudinary.openUploadWidget(
  //     {
  //       cloud_name: "dbceyrev6",
  //       upload_preset: "d0xfvpgr",
  //       theme: "white",
  //       multiple: false,
  //       max_image_width: 300,
  //       max_image_height: 300,
  //       cropping_show_back_button: true,
  //       cropping_aspect_ratio: 1,
  //       cropping: "server",
  //       gravity: "custom"
  //     },
  //     (error, result) => {
  //       try {
  //         this.setState({ image: result[0].secure_url, hint: true });
  //       } catch (err) {
  //         console.log("do nothing");
  //       }
  //     }
  //   );
  // };

  onFormSubmit = values => {
    const userData = { ...values };
    userData.image = this.state.image;
    userData.interests =
      this.state.interests.length === 0 ? undefined : this.state.interests;
    // userData.birthDate = moment(new Date(userData.birthDate))
    //   .format("YYYY-MM-DD")
    //   .includes("Invalid")
    //   ? undefined
    //   : moment(new Date(userData.birthDate)).format("YYYY-MM-DD");
    //console.log(this.state.display);
    userData.password = this.state.display ? this.state.password : undefined;
    userData.password2 = this.state.display ? this.state.password2 : undefined;
    const user = {
      user: userData
    };

    const callback = () => {
      // push to default page
      this.props.history.push(`/user/${this.props.currentUser.username}`);
      this.createNotification("success")();
    };
    this.props.onUpdateUser(user, callback);
  };

  render() {
    const { errors } = this.state;
    const { submitting, handleSubmit } = this.props;
    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus">
        <img
          src={this.state.image}
          alt=""
          style={{ width: 200, height: 200 }}
        />
      </Popover>
    );
    const changePassword = (
      <div>
        <div className="form-group">
          <input
            type="password"
            className={classnames("form-control form-control-lg", {
              "is-invalid": errors.password
            })}
            placeholder="New Password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
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
            placeholder="Confirm New Password"
            name="password2"
            value={this.state.password2}
            onChange={this.onChange}
          />

          {errors.password2 && (
            <p>
              <small style={{ color: "red", marginTop: 0 }}>
                {errors.password2}
              </small>
            </p>
          )}
        </div>
      </div>
    );
    return (
      <div style={{ width: "90%" }} className="center-block">
        <div style={{ margin: 0, padding: 0, display: "inline-block" }}>
          <GoBack />
        </div>
        <div
          className="border-shadow border-radius"
          style={{
            padding: 20,
            background: "white",
            border: "1px solid #ddd"
          }}
        >
          <h1 className=" text-center">Account Settings</h1>
          <p className="lead text-center">
            Edit all your account settings here
          </p>

          <form
            className="form-horizontal"
            onSubmit={handleSubmit(this.onFormSubmit)}
          >
            <h3
              style={{
                borderBottom: "1px solid #ddd",
                paddingBottom: 10,
                marginLeft: 20
              }}
            >
              Basics
            </h3>
            <div className="form-group">
              <label className="control-label col-sm-3">Username:</label>
              <div className="col-sm-9">
                <p className="form-control-static">
                  {this.props.currentUser.username}
                </p>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3">Password:</label>
              <div className="col-sm-8">
                <div
                  className="flex-row justify-content-between"
                  style={{ marginBottom: 10 }}
                >
                  <p
                    style={{ lineHeight: "20px" }}
                    className="form-control-static"
                  >
                    <span>********</span>
                  </p>
                  <button
                    onClick={() => {
                      this.setState(prevState => ({
                        display: !prevState.display
                      }));
                    }}
                    type="button"
                    className="btn btn-primary"
                  >
                    {!this.state.display ? "Change Password" : "Cancel"}
                  </button>
                </div>
                {this.state.display ? changePassword : null}
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3">Profile:</label>
              <div className="col-sm-8">
                <div
                  className="flex-row justify-content-between"
                  style={{ marginBottom: 10 }}
                >
                  <div>
                    <OverlayTrigger
                      trigger={["hover", "focus"]}
                      rootClose
                      placement="top"
                      overlay={popoverHoverFocus}
                    >
                      <img
                        src={this.state.image}
                        alt=""
                        className="avatar"
                        style={{ cursor: "pointer", width: 50, height: 50 }}
                      />
                    </OverlayTrigger>
                  </div>
                  <div className="flex-row align-items-center">
                    <Script
                      url={`https://widget.cloudinary.com/global/all.js`}
                      onLoad={this.handleScriptLoad}
                    />

                    {this.state.scriptLoaded && (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          window.cloudinary.openUploadWidget(
                            {
                              cloud_name: "dbceyrev6",
                              upload_preset: "d0xfvpgr",
                              theme: "white",
                              multiple: false,
                              max_image_width: 300,
                              max_image_height: 300,
                              cropping_show_back_button: true,
                              cropping_aspect_ratio: 1,
                              cropping: "server",
                              gravity: "custom"
                            },
                            (error, result) => {
                              try {
                                this.setState({
                                  image: result[0].secure_url,
                                  hint: true
                                });
                              } catch (err) {
                                console.log("do nothing");
                              }
                            }
                          );
                        }}
                      >
                        Change Profile Image
                      </button>
                    )}
                  </div>
                </div>
                {this.state.hint ? (
                  <p>
                    Press the "Updating Settings" button below to upload your
                    image
                  </p>
                ) : null}
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3 " htmlFor="gender">
                Gender:
              </label>
              <div className="col-sm-9">
                <Field
                  name="gender"
                  value="male"
                  label="Male"
                  type="radio"
                  component={RadioInputGroup}
                />
                <Field
                  name="gender"
                  value="female"
                  label="Female"
                  type="radio"
                  component={RadioInputGroup}
                />
                <Field
                  name="gender"
                  value="N/A"
                  label="N/A"
                  type="radio"
                  component={RadioInputGroup}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3">Birth&nbsp;Date:</label>
              <div className="col-sm-8 " style={{ padding: 0 }}>
                <div style={{ marginLeft: 15 }}>
                  <Field
                    name="birthDate"
                    component={DateFieldGroup}
                    dateFormat="YYYY-MM-DD"
                    showYearDropdown={true}
                    showMonthDropdown={true}
                    dropdownMode="select"
                    maxDate={moment().subtract(18, "years")}
                    placeholder="you must be above 18"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3 ">Hometown:</label>
              <div className="col-sm-8">
                <Field
                  name="city"
                  options={{ types: ["(cities)"] }}
                  label="Female"
                  component={PlaceInputGroup}
                />
              </div>
            </div>

            <h3
              style={{
                borderBottom: "1px solid #ddd",
                paddingBottom: 10,
                marginLeft: 20
              }}
            >
              About Me{" "}
            </h3>
            <div className="form-group">
              <label className="control-label col-sm-3 ">Status:</label>
              <div className="col-sm-9">
                <Field
                  name="status"
                  type="radio"
                  value="relationship"
                  label="Relationship"
                  component={RadioInputGroup}
                />
                <Field
                  name="status"
                  type="radio"
                  value="married"
                  label="Married"
                  component={RadioInputGroup}
                />
                <Field
                  name="status"
                  type="radio"
                  value="single"
                  label="Single"
                  component={RadioInputGroup}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="control-label col-sm-3 ">Interests:</label>
              <div className="col-sm-8" style={{ padding: 0 }}>
                <Select
                  multi
                  onChange={this.handleSelectChange}
                  options={interests}
                  placeholder="Select your favourite(s)"
                  removeSelected={false}
                  closeOnSelect={false}
                  simpleValue={false}
                  value={this.state.interests}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3 ">Occupation:</label>
              <div className="col-sm-8">
                <Field
                  name="occupation"
                  type="text"
                  component={TextFieldGroup}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3 ">Region:</label>
              <div className="col-sm-8">
                <Field
                  name="origin"
                  component={PlaceInputGroup}
                  options={{ types: ["(regions)"] }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="control-label col-sm-3 ">About:</label>
              <div className="col-sm-8">
                <Field name="bio" rows={3} component={TextAreaFieldGroup} />
              </div>
            </div>

            <button
              style={{ marginBottom: 20 }}
              type="submit"
              disabled={submitting || this.props.inProgress}
              className="btn btn-success btn-lg btn-block"
            >
              {this.props.inProgress ? (
                <i className="fa fa-spinner fa-spin" />
              ) : (
                "Update Settings"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "userInfo", destroyOnUnmount: false })(Settings));
