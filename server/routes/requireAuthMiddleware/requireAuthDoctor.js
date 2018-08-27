const checkCSRFandDoctor = require("./checkCSRFandDoctor");
const axiosInstanceForApiServer = require("../axiosInstanceForApiServer");

module.exports = function(req, res, next) {
  // check to see if user have session stored in server
  if (req.session.user && req.session.user.token) {
    // Apply access token (req.session.user.token) to every request to api server
    axiosInstanceForApiServer.defaults.headers.common[
      "Authorization"
    ] = `Token ${req.session.user.token}`;

    // check to see if user have csrfToken in header
    // check to see if user is a doctor to access doctor's resource
    checkCSRFandDoctor(req, res, next);
  } else {
    // Delete access token from header
    delete axiosInstanceForApiServer.defaults.headers.common["Authorization"];
    return res.status(401).json({
      errors: "Unauthorized, Please refresh the page and log in"
    });
  }
};
