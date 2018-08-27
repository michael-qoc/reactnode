import axios from "axios";

const setAuthToken = CSRFToken => {
  if (CSRFToken) {
    // Apply to every request
    axios.defaults.headers.common["X-CSRF-Token"] = `xyz`;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["CSRF-Token"];
  }
};

export default setAuthToken;
