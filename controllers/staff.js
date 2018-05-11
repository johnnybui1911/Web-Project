var express = require('express')
var router = express.Router()

//staffPage
router.get('/staff', function(req, res){
  // if(req.session.logginCheck1)
  // {
    res.render('staff', {user: req.session.user});
  // }
  // else {
  //   res.render('index');
  // }

});

module.exports = router;
