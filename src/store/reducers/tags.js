import * as actionTypes from "../actions/actionTypes";

const initialState = {
  tags: null,
  inProgress: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    ////////////////////////////////////////

    case actionTypes.FETCH_TAGS_START:
      return {
        ...state,
        inProgress: true
      };

    case actionTypes.FETCH_TAGS_SUCCESS:
      return {
        ...state,
        tags: action.tags,
        inProgress: false
      };

    case actionTypes.FETCH_TAGS_FAIL:
      return {
        ...state,
        inProgress: false
      };

    default:
      return state;
  }
};

export default reducer;
