var router = require("express").Router();

router.use("/", require("./users"));
router.use("/profiles", require("./profiles"));
router.use("/articles", require("./articles"));
router.use("/resource", require("./resource"));

router.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      errors: "unauthorized"
    });
  }

  return next(err);
});

module.exports = router;
