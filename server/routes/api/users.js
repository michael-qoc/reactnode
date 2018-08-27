const express = require("express");
const router = express.Router();
const axiosInstanceForApiServer = require("../axiosInstanceForApiServer");
const requireAuth = require("../requireAuthMiddleware/requireAuth");

// Load input validation
const validateRegisterInput = require("../validation/register");
const loginValidation = require("../validation/login");
const validateUpdateSettingsInput = require("../validation/updatesettings");

/// @route POST api/users
/// @desc Register user
/// @access Public
router.post("/users", function(req, res, next) {
  const { errors, isValid } = validateRegisterInput(req.body.user);

  // Check validation
  if (!isValid) {
    return res.status(422).json({ errors: errors });
  }

  // Pass validation
  // Submit data to API server
  const authData = {
    user: {
      email: req.body.user.email,
      username: req.body.user.username,
      password: req.body.user.password,
      password2: req.body.user.password2,
      roleList: req.body.user.roleList || []
    }
  };

  axiosInstanceForApiServer
    .post("/api/users", authData)
    .then(result => {
      console.log("inside then block");
      console.log(result.data);
      req.session.user = { ...result.data.user };
      delete result.data.user.token;
      const CSRFToken = "xyz";
      req.session.csrfToken = CSRFToken;

      return res.json({ user: result.data.user, CSRFToken });
    })
    .catch(error => {
      return res.status(422).json({ errors: error.response.data.errors });
      // console.log(error.response.data);
    });
});

/// @route POST api/users/login
/// @desc Login user
/// @access Public
router.post("/users/login", (request, response, next) => {
  // Check validation
  const { errors, isValid } = loginValidation.validateLoginInput(
    request.body.user
  );
  if (!isValid) {
    return response.status(422).json({ errors: errors });
  }

  // Pass validation
  // Submit data to API server
  // Authenticate user by email&Password
  const authData = {
    user: {
      email: request.body.user.email,
      password: request.body.user.password
    }
  };

  axiosInstanceForApiServer
    .post("/api/users/login", authData)
    .then(result => {
      request.session.user = { ...result.data.user };
      delete result.data.user.token;
      const CSRFToken = "xyz";
      request.session.csrfToken = CSRFToken;
      console.log(request.session);
      return response.json({ user: result.data.user, CSRFToken });
    })
    .catch(error => {
      return response.status(422).json({ errors: error.response.data.errors });
    });
});

/// @route GET api/user
/// @desc Get current loggedin user
/// @access Private
router.get("/user", requireAuth, function(req, res, next) {
  if (!req.session.user) {
    return res.sendStatus(401);
  }

  const user = { ...req.session.user };

  delete user.token;

  console.log("/////////////////");
  console.log(user);

  return res.json({ user: user });
});

/// @route PUT api/user
/// @desc Update current loggedin user
/// @access Private
router.put("/user", requireAuth, function(req, res, next) {
  const { errors, isValid } = validateUpdateSettingsInput(req.body.user);

  // Check validation
  if (!isValid) {
    return res.status(422).json({ errors: errors });
  }

  // Pass validation
  // forbid user to update the username, email, roleList information
  if (req.body.user.email) {
    delete req.body.user.email;
  }

  if (req.body.user.username) {
    delete req.body.user.username;
  }

  if (req.body.user.roleList) {
    delete req.body.user.roleList;
  }

  // Submit data to API server
  const authData = {
    user: req.body.user
  };

  const CSRFToken = req.session.csrfToken;

  axiosInstanceForApiServer
    .put("/api/user", authData)
    .then(result => {
      console.log(result.data);
      req.session.user = result.data.user;
      return res.json({ user: result.data.user, CSRFToken });
    })
    .catch(error => {
      return res.status(401).json({ errors: error.response.data.errors });
    });
});

/// @route GET api/users/logout
/// @desc Logout user
/// @access Public
router.get("/users/logout", function(request, response) {
  request.session.destroy();
  return response.status(200).send();
});

module.exports = router;
