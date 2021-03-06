var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/helloExpress', function(req, res, next) {
    res.render('helloExpress', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
    res.render('home', { title: 'HOME PAGE' });
});

router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('user');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

router.get('/api/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('user');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.get('/newUser', function(req, res) {
    res.render('newUser', { title: 'Add New User' });
});

router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('user');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

module.exports = router;
