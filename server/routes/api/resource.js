const express = require("express");
const router = express.Router();
const requireAuth = require("../requireAuthMiddleware/requireAuth");
const requireAuthDoctor = require("../requireAuthMiddleware/requireAuthDoctor");
const requireAuthNurse = require("../requireAuthMiddleware/requireAuthNurse");

/// @route GET api/resource/all
/// @desc Get resource for all logged in user
/// @access Private
router.get("/all", requireAuth, function(req, res, next) {
  if (!req.session.user) {
    return res.sendStatus(401);
  }

  return res.json({
    resource: "here's protected resource for all logged in user"
  });
});

/// @route GET api/resource/doctor
/// @desc Get resource for only logged in Doctor
/// @access Private
router.get("/doctor", requireAuthDoctor, function(req, res, next) {
  if (!req.session.user) {
    return res.sendStatus(401);
  }

  return res.json({
    resource: "here's protected resource for only logged in doctor"
  });
});

/// @route GET api/resource/nurse
/// @desc Get resource for only logged in nurse
/// @access Private
router.get("/nurse", requireAuthNurse, function(req, res, next) {
  if (!req.session.user) {
    return res.sendStatus(401);
  }
  return res.json({
    resource: "here's protected resource for only logged in Nurse"
  });
});

module.exports = router;
