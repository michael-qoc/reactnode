import * as actionTypes from "./actionTypes";
import axios from "axios";

///////////////////////////

export const fetchArticlesStart = () => {
  return {
    type: actionTypes.FETCH_ARTICLES_START
  };
};

export const fetchArticlesSuccess = (articles, articlesCount) => {
  return {
    type: actionTypes.FETCH_ARTICLES_SUCCESS,
    articles,
    articlesCount
  };
};

export const fetchArticlesFail = error => {
  return {
    type: actionTypes.FETCH_ARTICLES_FAIL,
    error
  };
};

export const fetchArticles = page => {
  return dispatch => {
    dispatch(fetchArticlesStart());

    axios
      .get(`/api/articles`)
      .then(res => {
        dispatch(
          fetchArticlesSuccess(res.data.articles, res.data.articlesCount)
        );
      })
      .catch(err => {
        //   this.setState({ loading: false });
        dispatch(fetchArticlesFail(err));
      });
  };
};

///////////////////////////

export const fetchArticlesByTag = (tag, page) => {
  return dispatch => {
    dispatch(fetchArticlesStart());

    axios
      .get(`/api/articles?tag=${encodeURIComponent(tag)}`)
      .then(res => {
        dispatch(
          fetchArticlesSuccess(res.data.articles, res.data.articlesCount)
        );
      })
      .catch(err => {
        dispatch(fetchArticlesFail(err));
      });
  };
};

//////////////////////////////////////////////

//////////////////////////////////////////////

export const fetchMyArticles = username => {
  return dispatch => {
    dispatch(fetchArticlesStart());
    axios
      .get(`/api/articles?author=${encodeURIComponent(username)}`)
      .then(res => {
        dispatch({
          type: actionTypes.FETCH_MY_ARTICLES_SUCCESS,
          payload: res.data.articles
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
