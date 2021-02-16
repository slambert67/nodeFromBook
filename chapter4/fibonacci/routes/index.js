var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to the Fibonacci calculator' });
});

// demonstrate error handler
router.get('/error', function(req, res, next) {
  next({
    status: 404,
    message: "Fake Error"
  });
});


module.exports = router;
