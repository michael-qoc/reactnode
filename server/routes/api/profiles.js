var router = require("express").Router();
const axiosInstanceForApiServer = require("../axiosInstanceForApiServer");

//// @route GET api/profiles/:username
/// @desc Get user's profile by username Route
/// @access Public
router.get("/:username", function(req, res, next) {
  console.log(req.params.username);

  axiosInstanceForApiServer
    .get(`/api/profiles/${req.params.username}`)
    .then(result => {
      //console.log(result.data);
      return res.json({
        profile: result.data.profile
      });
    })
    .catch(error => {
      return res.status(404).json({
        errors: "User not found"
      });
    });

  // return res.json({
  //   profile: req.profile.toProfileJSONFor(false),
  //   linkedInProfile: req.linkedInProfile
  // });
});

module.exports = router;
