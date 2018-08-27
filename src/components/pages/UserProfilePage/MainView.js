import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Spinner from "../../common/Spinner";
import moment from "moment";

class MainView extends Component {
  render() {
    const { userInfo } = this.props;
    const information = (
      <div className="row">
        <div className="col-sm-6">
          <h3
            className="bg-primary border-radius"
            style={{ margin: " 10px auto", padding: "5px 10px" }}
          >
            Basics
          </h3>
          <form className="form-horizontal userInfo-form">
            <div className="form-group">
              <label className="control-label col-sm-3 ">Gender:</label>
              <div className="col-sm-8 pull-right">
                <p className="form-control-static">
                  {userInfo ? userInfo.gender || "N/A" : "N/A"}
                </p>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3 ">
                Birth&nbsp;Date:
              </label>
              <div className="col-sm-8 pull-right">
                <p className="form-control-static">
                  {userInfo
                    ? moment(new Date(userInfo.birthDate)).format(
                        "YYYY-MM-DD"
                      ) || "N/A"
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3 ">Occupation:</label>
              <div className="col-sm-8 pull-right">
                <p className="form-control-static">
                  {userInfo ? userInfo.occupation || "N/A" : "N/A"}
                </p>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3 ">City:</label>
              <div className="col-sm-8 pull-right">
                <p className="form-control-static">
                  {userInfo ? userInfo.city || "N/A" : "N/A"}
                </p>
              </div>
            </div>
          </form>
        </div>
        <div className="col-sm-6">
          <h3
            className="bg-primary border-radius"
            style={{ margin: " 10px auto", padding: "5px 10px" }}
          >
            About Me
          </h3>
          <form className="form-horizontal userInfo-form">
            <div className="form-group">
              <label className="control-label col-sm-3 ">Status:</label>
              <div className="col-sm-8 pull-right">
                <p className="form-control-static">
                  {userInfo ? userInfo.status || "N/A" : "N/A"}
                </p>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3 ">Hometown:</label>
              <div className="col-sm-8 pull-right">
                <p className="form-control-static">
                  {userInfo ? userInfo.origin || "N/A" : "N/A"}
                </p>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3 ">Interests:</label>
              <div className="col-sm-8 pull-right">
                <p className="form-control-static">
                  {userInfo
                    ? userInfo.interests.map(item => (
                        <span
                          key={item.value}
                          className="btn-info border-radius"
                          style={{
                            display: "inline-block",
                            margin: 5,
                            marginBottom: 0,
                            marginLeft: 0,
                            padding: "3px 5px"
                          }}
                        >
                          <span className="text-info ">{item.label}</span>
                        </span>
                      ))
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3 ">Role:</label>
              <div className="col-sm-8 pull-right">
                <p className="form-control-static">
                  {userInfo
                    ? userInfo.roleList.map(item => (
                        <span
                          key={item}
                          className="btn-info border-radius"
                          style={{
                            display: "inline-block",
                            margin: 5,
                            marginBottom: 0,
                            marginLeft: 0,
                            padding: "3px 5px"
                          }}
                        >
                          <span className="text-info ">{item}</span>
                        </span>
                      ))
                    : "N/A"}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
    return (
      <div
        className="border-shadow col-md-10  col-md-offset-1"
        style={{
          minHeight: 250,
          background: "white",
          border: "1px solid #ddd",
          padding: "10px",
          marginBottom: 30
        }}
      >
        {userInfo ? information : <Spinner minHeight={250} />}
      </div>
    );
  }
}
export default withRouter(MainView);
