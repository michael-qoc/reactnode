import * as actionTypes from "../actions/actionTypes";

const initialState = {
  CSRFToken: null,
  currentUser: {},
  errors: {},
  getCurrentAuthStatusReady: false,
  inProgress: false,
  redirectTo: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        CSRFToken: null,
        currentUser: {},
        errors: {},
        inProgress: false,
        redirectTo: "/"
      };

    case actionTypes.REDIRECT:
      return {
        ...state,
        redirectTo: null
      };

    case actionTypes.GET_CURRENT_AUTH_STATUS_SUCCESS:
      return {
        ...state,
        getCurrentAuthStatusReady: true,
        currentUser: action.payload.user
      };

    case actionTypes.GET_CURRENT_AUTH_STATUS_FAIL:
      return {
        ...state,
        getCurrentAuthStatusReady: true
      };

    case actionTypes.AUTH_START:
      return {
        ...state,
        errors: {},
        inProgress: true
      };

    case actionTypes.SET_CSRF_TOKEN:
      return {
        ...state,
        CSRFToken: action.CSRFToken
      };

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        CSRFToken: action.payload.CSRFToken,
        currentUser: action.payload.user,
        errors: {},
        inProgress: false
        //authRedirectPath: "/myaccount"
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        CSRFToken: null,
        currentUser: {},
        errors: action.payload.errors,
        inProgress: false
      };

    case actionTypes.UPDATE_FAIL:
      return {
        ...state,
        errors: action.payload.errors,
        inProgress: false
      };

    default:
      return state;
  }
};

export default reducer;
