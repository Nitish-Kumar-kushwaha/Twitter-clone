const express = require("express");
const router = express.Router();


// to get the signup form
router.get('/register',function(req , res){
    res.render('auth/signup');
})


module.exports = router;













module.exports = router;