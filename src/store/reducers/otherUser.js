import * as actionTypes from "../actions/actionTypes";

const initialState = {
  profile: null,
  inProgress: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROFILE_START:
      return {
        ...state,
        inProgress: true
      };

    case actionTypes.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...action.payload.profile,
          LinkedInnProfile: action.payload.linkedInProfile
        },
        inProgress: false
      };

    case actionTypes.FETCH_PROFILE_FAIL:
      return {
        ...state,
        inProgress: false
      };

    //////////////////////////////////////////

    case actionTypes.FOLLOW_PROFILE_START:
      return {
        ...state,
        inProgress: true
      };

    case actionTypes.FOLLOW_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.profile,
        inProgress: false
      };

    case actionTypes.FOLLOW_PROFILE_FAIL:
      return {
        ...state,
        inProgress: false
      };

    ///////////////////////////////////////

    case actionTypes.UNFOLLOW_PROFILE_START:
      return {
        ...state,
        inProgress: true
      };

    case actionTypes.UNFOLLOW_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.profile,
        inProgress: false
      };

    case actionTypes.UNFOLLOW_PROFILE_FAIL:
      return {
        ...state,
        inProgress: false
      };

    ///////////////////////////////////////

    case actionTypes.PROFILE_PAGE_UNLOADED:
      return {};

    default:
      return state;
  }
};

export default reducer;
