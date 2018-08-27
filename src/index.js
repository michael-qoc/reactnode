import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./store/store";
import * as actionTypes from "./store/actions/actionTypes";
import setAuthToken from "./utils/setAuthToken";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ScrollToTop from "./components/common/ScrollToTop";
import "./styles/styles.scss";
import "./assets/icon/web-fonts-with-css/css/fontawesome-all.min.css";
import "./App.css";
import "react-notifications/lib/notifications.css";

/// check for CSRFToken
const CSRFToken = localStorage.getItem("CSRFToken");
if (CSRFToken) {
  // Set CSRFToken inside every ajax request headers
  setAuthToken(CSRFToken);

  // SET CSRFToken inside Redux state
  store.dispatch({ type: actionTypes.SET_CSRF_TOKEN, CSRFToken });
}

const app = (
  <MuiThemeProvider>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(app, document.getElementById("root"));
