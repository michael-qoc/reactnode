var router = require("express").Router();
const axiosInstanceForApiServer = require("../axiosInstanceForApiServer");

/// @route GET api/articles
/// @desc Get all articles based on different queries string
/// @access Public
router.get("/", function(req, res, next) {
  let offset = 1;
  let limit = 10;

  if (typeof req.query.limit !== "undefined") {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== "undefined") {
    offset = req.query.offset;
  }

  //// fetch data from remote API server
  axiosInstanceForApiServer
    .get("/api/articles")
    .then(result => {
      const apiReturnedArticles = result.data.articles;

      //// when promise success, do all your data manipulation here
      let filteredArticles = apiReturnedArticles
        .sort((a, b) => {
          const dateInTimeStampOfA = new Date(a.createdAt).getTime();
          const dateInTimeStampOfB = new Date(b.createdAt).getTime();
          if (dateInTimeStampOfA > dateInTimeStampOfB) {
            return 1;
          }
        })
        .slice(offset, apiReturnedArticles.length)
        .filter(item => {
          if (!req.query.tag) {
            return true;
          } else {
            return item.tagList.indexOf(req.query.tag) > -1;
          }
        })
        .filter(item => {
          if (!req.query.author) {
            return true;
          } else {
            return item.author.username === req.query.author;
          }
        })
        .filter(item => {
          if (!req.query.favorited) {
            return true;
          } else {
            return item.favorited;
          }
        })
        .slice(0, limit);

      const articlesCount = filteredArticles.length;
      return res.status(200).json({
        articles: filteredArticles,
        articlesCount: articlesCount
      });
    })
    .catch(next);
});

module.exports = router;
