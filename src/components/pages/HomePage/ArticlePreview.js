import React, { PureComponent, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  ...state.auth
});

class ArticlePreview extends PureComponent {
  render() {
    const article = this.props.article;
    return (
      <div
        className="article-preview"
        style={{ background: "white", padding: 15 }}
      >
        <div className="clearfix">
          <div className="media" style={{ margin: 0 }}>
            <div className="media-left">
              <Link to={`/user/${article.author.username}`}>
                <img className="avatar" alt="" src={article.author.image} />
              </Link>
            </div>
            <div className="media-body">
              <h5 className="media-heading">
                <Link
                  className="author"
                  //style={{ color: "black" }}
                  to={`/user/${article.author.username}`}
                >
                  {article.author.username}
                </Link>
              </h5>

              <p>
                <span className="text-light-grey">
                  {new Date(article.createdAt).toDateString()}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: 55 }}>
          <h3 className="text-dark" style={{ marginTop: 0 }}>
            {article.title}
          </h3>
          <p style={{ color: "black" }}>{article.description}</p>
          <div className="clearfix">
            <span>Read more...</span>
            <ul className="pull-right">
              {article.tagList.map(tag => {
                return (
                  <li className="tag-default tag-pill " key={tag}>
                    {tag}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ArticlePreview);
