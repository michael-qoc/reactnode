import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import * as actionTypes from "../../../store/actions/actionTypes";
import ArticleList from "./ArticleList";
import classnames from "classnames";
import store from "../../../store/store";

class MainView extends Component {
  componentDidMount() {
    if (!this.props.articles) {
      switch (this.props.tab) {
        case "all":
          this.props.onFetchArticles();
          break;

        default:
          this.props.onFetchArticlesByTag(this.props.tab);
      }
    }
  }

  onClickAllTab = ev => {
    ev.preventDefault();
    store.dispatch({
      type: actionTypes.SET_ALL
    });
    this.props.onFetchArticles();
  };

  onRemoveTagTab = ev => {
    ev.preventDefault();

    store.dispatch({
      type: actionTypes.CLEAR_TAG
    });
    this.props.onFetchArticles();
  };

  onClickTagTab = ev => {
    ev.preventDefault();
    store.dispatch({
      type: actionTypes.SET_TAG,
      payload: this.props.tag
    });
    this.props.onFetchArticlesByTag(this.props.tag);
  };

  onSetPage = page => {
    ///this.props.onFetchArticles(page - 1);

    switch (this.props.tab) {
      case "all":
        this.props.onFetchArticles();
        break;

      default:
        this.props.onFetchArticlesByTag(this.props.tab);
    }
    store.dispatch({
      type: actionTypes.SET_PAGE,
      page: page
    });
  };

  render() {
    return (
      <div
        className="col-sm-9 col-sm-pull-3 border-shadow border-radius"
        style={{ padding: 20, background: "white", border: "1px solid #ddd" }}
      >
        <div>
          <ul className="nav nav-pills">
            <li
              className={classnames({
                "active-nav-pills": this.props.tab === "all"
              })}
            >
              <a href="" onClick={this.onClickAllTab}>
                Global Feed
              </a>
            </li>

            {this.props.tag ? (
              <li
                className={classnames({
                  "active-nav-pills": this.props.tab === this.props.tag
                })}
              >
                <a href="" onClick={this.onClickTagTab}>
                  {this.props.tag}
                </a>
              </li>
            ) : null}
            {this.props.tag ? (
              <li
                className={classnames({
                  "active-nav-pills": this.props.tab === this.props.tag
                })}
              >
                <a href="" onClick={this.onRemoveTagTab}>
                  <span>X</span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <ArticleList
          articles={this.props.articles}
          articlesCount={this.props.articlesCount}
          inProgress={this.props.inProgress}
          onSetPage={this.onSetPage}
          currentPage={this.props.currentPage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.articleList,
  token: state.auth.token
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFetchArticles: page => dispatch(actions.fetchArticles(page)),
  onFetchArticlesByTag: (tag, page) =>
    dispatch(actions.fetchArticlesByTag(tag, page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
