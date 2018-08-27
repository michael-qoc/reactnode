module.exports = function(req, res, next) {
  const csrfToken = req.get("X-CSRF-Token");
  console.log("csrfToken", csrfToken);
  console.log("req.session.csrfToken", req.session.csrfToken);

  if (!csrfToken)
    return res
      .status(401)
      .json({ errors: "CSRF token missing. Please refresh the page." });

  if (!req.session.csrfToken) {
    return res.status(401).json({
      errors: "No CSRF token recorded in your session. Please refresh the page."
    });
  }

  if (req.session.csrfToken !== csrfToken) {
    return res
      .status(401)
      .json({ errors: "Invalid CSRF token. Please refresh the page." });
  }

  // check to see if user is a nurse to access nurse's resource
  if (req.session.user.roleList.indexOf("nurse") < 0) {
    return res.status(401).json({
      errors:
        "Sorry, you are not a nurse, you dont have access to nurse's resource "
    });
  }

  next();
};
