var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(req.csrfToken());
  res.render('send', {csrfToken: req.csrfToken()});
});

module.exports = router;
