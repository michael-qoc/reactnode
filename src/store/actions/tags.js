import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchTagsStart = () => {
  return {
    type: actionTypes.FETCH_TAGS_START
  };
};

export const fetchTagsSuccess = tags => {
  return {
    type: actionTypes.FETCH_TAGS_SUCCESS,
    tags
  };
};

export const fetchTagsFail = error => {
  return {
    type: actionTypes.FETCH_TAGS_FAIL,
    error
  };
};

export const fetchTags = () => {
  return dispatch => {
    dispatch(fetchTagsStart());

    axios
      .get("https://www.superapp.ca/api/tags")
      .then(res => {
        dispatch(fetchTagsSuccess(res.data.tags));
      })
      .catch(err => {
        //   this.setState({ loading: false });
        dispatch(fetchTagsFail(err));
      });
  };
};
