import React, { PureComponent } from "react";

import ArticlePreview from "./ArticlePreview";

import Spinner from "../../common/Spinner";

class ArticleList extends PureComponent {
  render() {
    if (!this.props.articles || this.props.inProgress) {
      return <Spinner />;
    }

    if (this.props.articles.length === 0) {
      return (
        <div style={{ minHeight: 400 }}>
          <p style={{ marginTop: 15 }}>No articles are here... yet.</p>
        </div>
      );
    }

    const articleList = this.props.articles.map(article => {
      return <ArticlePreview key={article.slug} article={article} />;
    });

    return <div>{articleList}</div>;
  }
}

export default ArticleList;
