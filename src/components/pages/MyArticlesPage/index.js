import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import axios from "axios";
import * as actions from "../../../store/actions";
import ArticleList from "../HomePage/ArticleList";
import ComplexBanner from "../../common/Banner/ComplexBanner";
import SpinnerBanner from "../../common/Banner/SpinnerBanner";
import GoBack from "../../common/GoBack";

const mapStateToProps = state => ({
  ...state.articleList,
  currentUser: state.auth.currentUser,
  CSRFToken: state.auth.CSRFToken,
  ...state.otherUser,
  otherUser: state.otherUser,
  articleInProgress: state.articleList.inProgress
});

const mapDispatchToProps = dispatch => ({
  // onFetchArticlesByAuthor: author =>
  //   dispatch(actions.fetchArticlesByAuthor(author)),
  // onFetchArticlesFavByUser: author =>
  //   dispatch(actions.fetchArticlesFavByUser(author)),
  onFetchProfile: username => dispatch(actions.fetchProfile(username)),
  onUnload: () => dispatch(actions.profilePageUnloaded())
});

class MyArticlesPage extends React.Component {
  state = {
    myArticles: true,
    favArticles: false,
    myArticlesList: null,
    favArticlesList: null,
    articleInProgress: false
  };
  componentDidMount() {
    this.props.onFetchProfile(this.props.match.params.username);
    this.setState({ articleInProgress: true });

    axios
      .get(
        `/api/articles?author=${encodeURIComponent(
          this.props.match.params.username
        )}`
      )
      .then(res => {
        this.setState({
          myArticlesList: res.data.articles,
          articleInProgress: false
        });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(
        `/api/articles?favorited=${encodeURIComponent(
          this.props.match.params.username
        )}`
      )
      .then(res => {
        this.setState({ favArticlesList: res.data.articles });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onFetchArticlesByAuthor = event => {
    event.preventDefault();
    this.setState({
      myArticles: true,
      favArticles: false
    });
  };

  onFetchArticlesFavByUser = event => {
    event.preventDefault();

    if (this.state.favArticlesList) {
      this.setState({
        myArticles: false,
        favArticles: true
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      window.location.reload();
      //this.props.history.push(`${nextProps.match.params.username}`);
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const tabList = (
      <ul className="nav nav-pills">
        <li
          className={classnames({
            "active-nav-pills": this.state.myArticles
          })}
        >
          <a
            href=""
            onClick={this.onFetchArticlesByAuthor}
            style={{ cursor: "pointer" }}
          >
            My Articles
          </a>
        </li>
      </ul>
    );

    return (
      <div
        className="border-shadow border-radius"
        style={{ padding: 20, background: "white" }}
      >
        <div className="articles-toggle">{tabList}</div>

        {this.state.myArticles ? (
          <ArticleList
            articles={this.state.myArticlesList}
            inProgress={this.state.articleInProgress}
            showPage={false}
            articlesCount={
              this.state.myArticlesList ? this.state.myArticlesList.length : 0
            }
            // currentPage={this.props.currentPage}
            // onSetPage={onSetPage}
          />
        ) : (
          <ArticleList
            articles={this.state.favArticlesList}
            inProgress={this.state.articleInProgress}
            articlesCount={this.state.favArticlesList.length}
            showPage={false}
            // currentPage={this.props.currentPage}
            // onSetPage={onSetPage}
          />
        )}
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyArticlesPage)
);
