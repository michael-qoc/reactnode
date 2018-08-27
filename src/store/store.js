import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import auth from "./reducers/auth";
import articleList from "./reducers/articleList";
import tags from "./reducers/tags";
import otherUser from "./reducers/otherUser";
import { reducer as formReducer } from "redux-form";
import throttle from "lodash/throttle";
import { loadState, saveState } from "../utils/localStorage";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const persistedState = loadState();

const defaultState = {
  appName: "React & Node"
};
const rootReducer = combineReducers({
  state: (state = defaultState) => state,
  auth,
  articleList,

  tags,
  otherUser,
  form: formReducer
});

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(
  throttle(() => {
    saveState({
      // auth: {
      //   CSRFToken: store.getState().auth.CSRFToken,

      //   currentUser: {},
      //   errors: {},
      //   getCurrentAuthStatusReady: false,
      //   inProgress: false,
      //   redirectTo: null
      // },
      articleList: {
        tab: store.getState().articleList.tab,
        tag: store.getState().articleList.tag,
        myArticles: store.getState().articleList.myArticles
      }
    });
  }, 1000)
);

export default store;
