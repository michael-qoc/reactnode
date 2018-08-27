import * as actionTypes from "./actionTypes";
import axios from "axios";

import setAuthToken from "../../utils/setAuthToken";

export const logout = () => {
  // Remove CSRFToken from localStorage
  localStorage.removeItem("CSRFToken");

  // Remove auth state from server session
  axios.get("/api/users/logout");

  // Remove CSRFToken from all future ajax request
  setAuthToken(false);

  // Clear Redux Auth State
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = payload => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload
  };
};

export const authFail = payload => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload
  };
};

export const register = (authData, callback) => {
  return dispatch => {
    dispatch(authStart());

    axios
      .post("api/users", authData)
      .then(response => {
        localStorage.setItem("CSRFToken", response.data.CSRFToken);
        // Set CSRFToken inside every ajax request headers
        const { CSRFToken } = response.data;
        setAuthToken(CSRFToken);

        // dispatch redux action
        dispatch(authSuccess(response.data));
        callback(response.data.user.username);
      })
      .catch(error => {
        console.log(error.response.data);
        dispatch(authFail(error.response.data));
      });
  };
};

export const login = (authData, callback) => {
  return dispatch => {
    dispatch(authStart());

    axios
      .post("api/users/login", authData)
      .then(response => {
        localStorage.setItem("CSRFToken", response.data.CSRFToken);
        // Set CSRFToken inside every ajax request headers
        const { CSRFToken } = response.data;
        setAuthToken(CSRFToken);

        // dispatch redux action
        dispatch(authSuccess(response.data));
        // redirect route through callback
        callback(response.data.user.username);
      })
      .catch(error => {
        console.log(error.response.data);
        dispatch(authFail(error.response.data));
      });
  };
};

export const getCurrentAuthStatus = () => {
  return dispatch => {
    axios
      .get("/api/user")
      .then(response => {
        dispatch({
          type: actionTypes.GET_CURRENT_AUTH_STATUS_SUCCESS,
          payload: response.data
        });
        console.log(response);
      })
      .catch(error => {
        dispatch({
          type: actionTypes.GET_CURRENT_AUTH_STATUS_FAIL
        });
        console.log(error.response);
      });
  };
};

export const updateUser = (authData, callback) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .put("/api/user", authData)
      .then(response => {
        dispatch(authSuccess(response.data));
        callback();
      })
      .catch(error => {
        dispatch({
          type: actionTypes.UPDATE_FAIL,
          payload: error.response.data
        });
        console.log(error.response);
      });
  };
};
