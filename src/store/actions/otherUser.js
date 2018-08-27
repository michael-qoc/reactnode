import * as actionTypes from "./actionTypes";
import axios from "axios";

export const profilePageUnloaded = () => {
  return {
    type: actionTypes.PROFILE_PAGE_UNLOADED
  };
};
/////////////////////////////

export const profileFavoritesPageUnloaded = () => {
  return {
    type: actionTypes.PROFILE_FAVORITES_PAGE_UNLOADED
  };
};
/////////////////////////////

export const fetchProfileStart = () => {
  return {
    type: actionTypes.FETCH_PROFILE_START
  };
};

export const fetchProfileSuccess = payload => {
  return {
    type: actionTypes.FETCH_PROFILE_SUCCESS,
    payload
  };
};

export const fetchProfileFail = error => {
  return {
    type: actionTypes.FETCH_PROFILE_FAIL,
    error
  };
};

export const fetchProfile = username => {
  return dispatch => {
    dispatch(fetchProfileStart());

    axios
      .get(`/api/profiles/${username}`)
      .then(res => {
        
        dispatch(fetchProfileSuccess(res.data));
      })
      .catch(err => {
        //   this.setState({ loading: false });
        dispatch(fetchProfileFail(err));
      });
  };
};

////////////////////////////////////////////////////

export const followProfileStart = () => {
  return {
    type: actionTypes.FOLLOW_PROFILE_START
  };
};

export const followProfileSuccess = profile => {
  return {
    type: actionTypes.FOLLOW_PROFILE_SUCCESS,
    profile
  };
};

export const followProfileFail = error => {
  return {
    type: actionTypes.FOLLOW_PROFILE_FAIL,
    error
  };
};

export const followProfile = (token, username, callback) => {
  return dispatch => {
    dispatch(followProfileStart());

    axios
      .post(`/api/profiles/${username}/follow`)
      .then(res => {
        
        dispatch(followProfileSuccess(res.data.profile));
        callback();
      })
      .catch(err => {
        //   this.setState({ loading: false });
        dispatch(followProfileFail(err));
      });
  };
};

////////////////////////////////////////////////////

export const unfollowProfileStart = () => {
  return {
    type: actionTypes.UNFOLLOW_PROFILE_START
  };
};

export const unfollowProfileSuccess = profile => {
  return {
    type: actionTypes.UNFOLLOW_PROFILE_SUCCESS,
    profile
  };
};

export const unfollowProfileFail = error => {
  return {
    type: actionTypes.UNFOLLOW_PROFILE_FAIL,
    error
  };
};

export const unfollowProfile = (token, username, callback) => {
  return dispatch => {
    dispatch(unfollowProfileStart());

    axios
      .delete(`/api/profiles/${username}/follow`)
      .then(res => {
        
        dispatch(unfollowProfileSuccess(res.data.profile));
        callback();
      })
      .catch(err => {
        //   this.setState({ loading: false });
        dispatch(unfollowProfileFail(err));
      });
  };
};

////////////////////////////////////////////////////
