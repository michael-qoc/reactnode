import * as actionTypes from "../actions/actionTypes";

const initialState = {
  articles: null,
  myArticles: null,
  tab: "all",
  tag: null,
  inProgress: false,
  articlesCount: 0,
  currentPage: 1
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE:
      return {
        ...state,
        currentPage: action.page
      };

    ////////////////////////////////////////

    case actionTypes.FETCH_ARTICLES_START:
      return {
        ...state,
        inProgress: true,
        currentPage: 1
      };

    case actionTypes.FETCH_ARTICLES_FAIL:
      return {
        ...state,
        inProgress: false
      };

    case actionTypes.FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.articles,
        articlesCount: action.articlesCount,
        inProgress: false
      };

    case actionTypes.FAV_SINGLEARTICLE_SUCCESS:
      return {
        ...state,
        // be careful the code below has potential bug depends on different route/page
        // a better way to prevent bug is to put the articleList data of "MyArticles" page inside Redux state rather than local state
        articles: (state.articles || []).map(article => {
          if (article.slug === action.article.slug) {
            return {
              ...article,
              ...action.article
            };
          } else {
            return article;
          }
        })
      };

    case actionTypes.SET_FEED:
      return {
        ...state,
        tab: "feed"
      };

    case actionTypes.SET_ALL:
      return {
        ...state,
        tab: "all"
      };
    case actionTypes.SET_TAG:
      return {
        ...state,
        tab: action.payload,
        tag: action.payload
      };
    case actionTypes.CLEAR_TAG:
      return {
        ...state,
        tab: "all",
        tag: null
      };

    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        myArticles: null,
        tab: "all",
        tag: null,
        inProgress: false,
        articlesCount: 0,
        currentPage: 1
      };

    //////////////////////////////////

    case actionTypes.FETCH_MY_ARTICLES_SUCCESS:
      return {
        ...state,
        myArticles: action.payload
      };

    case actionTypes.ADD_ARTICLE_SUCCESS:
      return {
        ...state,
        //articles: (state.articles || []).concat([action.article])
        articles: state.articles
          ? [action.article].concat(state.articles)
          : null
      };

    case actionTypes.UPDATE_ARTICLE_SUCCESS:
      return {
        ...state,
        inProgress: false,
        articles: state.articles
          ? state.articles.map(article => {
              if (article.slug === action.article.slug) {
                return {
                  ...article,
                  ...action.article
                };
              } else {
                return article;
              }
            })
          : null
      };

    case actionTypes.DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        inProgress: false,
        articles: state.articles
          ? state.articles.filter(article => article.slug !== action.slug)
          : null
      };

    ////////////////////////////////////////

    default:
      return state;
  }
};

export default reducer;
