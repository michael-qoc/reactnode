import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import Banner from "./Banner";
import MainView from "./MainView";
import Tags from "./Tags";
import axios from "axios";
import Modal from "antd/lib/modal";
import Button from "antd/lib/button";
import "antd/lib/modal/style/css";
import "antd/lib/button/style/css";

function success(content) {
  Modal.success({
    title: "Success",
    content: content
  });
}

function errorMessage(content) {
  Modal.error({
    title: "Error",
    content: content
  });
}

const mapStateToProps = state => ({
  CSRFToken: state.auth.CSRFToken,
  tags: state.tags.tags,
  ...state.articleList
});

const mapDispatchToProps = dispatch => {
  return {
    onFetchTags: () => dispatch(actions.fetchTags()),

    onClickTag: tag => dispatch(actions.fetchArticlesByTag(tag))
  };
};

class HomePage extends Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  componentDidMount() {
    this.props.onFetchTags();
  }

  fetchUserResource = () => {
    axios
      .get("/api/resource/all")
      .then(result => {
        console.log(result.data);
        success(result.data.resource);
      })
      .catch(error => {
        console.log(error.response);

        errorMessage(error.response.data.errors);
      });
  };

  fetchDoctorResource = () => {
    axios
      .get("/api/resource/doctor")
      .then(result => {
        console.log(result.data);
        success(result.data.resource);
      })
      .catch(error => {
        console.log(error.response);
        errorMessage(error.response.data.errors);
      });
  };

  fetchNurseResource = () => {
    axios
      .get("/api/resource/nurse")
      .then(result => {
        console.log(result.data);
        success(result.data.resource);
      })
      .catch(error => {
        console.log(error.response);
        errorMessage(error.response.data.errors);
      });
  };

  render() {
    return (
      <Fragment>
        <Banner />
        <div className="container">
          <div className="row">
            <div className="col-sm-3 col-sm-push-9">
              <div className="well light-grey">
                <p className="text-center">Popular Tags</p>
                <Tags
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag}
                />
              </div>
              <div className="well light-grey">
                <p className="text-center">LoggedIn User Resource</p>

                <button
                  onClick={this.fetchUserResource}
                  className="btn btn-lg btn-block btn-success"
                >
                  Fetch Resource
                </button>
              </div>

              <div className="well light-grey">
                <p className="text-center">LoggedIn Doctor Resource</p>
                <button
                  onClick={this.fetchDoctorResource}
                  className="btn btn-lg btn-block btn-success"
                >
                  Fetch Resource
                </button>
              </div>

              <div className="well light-grey">
                <p className="text-center">LoggedIn Nurse Resource</p>
                <button
                  onClick={this.fetchNurseResource}
                  className="btn btn-lg btn-block btn-success"
                >
                  Fetch Resource
                </button>
              </div>
            </div>
            <MainView />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
