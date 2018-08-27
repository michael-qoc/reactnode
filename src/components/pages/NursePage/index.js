import React, { Component } from "react";
import nursePic from "../../../assets/image/nurse.png";

export default class NurseResourcePage extends Component {
  render() {
    return (
      <div
        className="container text-center d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div style={{ marginTop: 80 }}>
          <h1 className="font-weight-light">Nurse's Page</h1>
          <span
            style={{
              width: 300,
              height: 400,
              display: "inline-block",
              marginTop: 30
            }}
          >
            <img src={nursePic} alt="" style={{ width: "100%" }} />
          </span>
          <h3 className="display-4 mb-5">
            This page and its content is only viewable to logged in user with a
            Nurse role
          </h3>

          <p className="text-center" style={{ marginTop: 50 }}>
            <a
              href="https://github.com/limuzi91/reactnode"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View Source Code
            </a>
          </p>
        </div>
      </div>
    );
  }
}
