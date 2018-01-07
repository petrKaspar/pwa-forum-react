/**
 * Created by Petr on 28.11.2017.
 */
'use strict'

//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./model/comments');
var User = require('./model/users');
var Thread = require('./model/threads');

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set 
//it up, or 3001
//var port = process.env.API_PORT || 3001;
var port = process.env.PORT;
//db config
var dbuser = 'petr2';
var dbpassword = '123456';
var mongoDB = `mongodb://${dbuser}:${dbpassword}@ds143559.mlab.com:43559/backend_pwa`;

mongoose.connect(mongoDB, { useMongoClient: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

//and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});
//=============================== comments =============================
//adding the /comments route to our /api router
router.route('/comments')
    //retrieve all comments from the database
    .get(function(req, res) {
        //looks at our Comment Schema
        Comment.find(function(err, comments) {
            if (err)
                res.send(err);
            //responds with a json object of our database comments.
            res.json(comments)
        });
    })
    //post new comment to the database
    .post(function(req, res) {
        var comment = new Comment();
        //body parser lets us use the req.body
        comment.author = req.body.author;
        comment.text = req.body.text;
        comment.lastUpdate = req.body.lastUpdate;
        comment.id_thread = req.body.id_thread;

        comment.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Comment successfully added!' });
        });
    });

//Adding a route to a specific comment based on the database ID
router.route('/comments/:comment_id')
    //retrieve all comments from the same thread from the database
    .get(function(req, res) {
        //looks at our Comment Schema
        Comment.find({'id_thread':req.params.comment_id}, function(err, comments) {
            if (err)
                res.send(err);
            //responds with a json object of our database comments.
            res.json(comments)
        });
    })

    //The put method gives us the chance to update our comment based on
    //the ID passed to the route
    .put(function(req, res) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err)
                res.send(err);
            //setting the new author and text to whatever was changed. If
    //nothing was changed we will not alter the field.
            (req.body.author) ? comment.author = req.body.author : null;
            (req.body.text) ? comment.text = req.body.text : null;
            (req.body.lastUpdate) ? comment.lastUpdate = req.body.lastUpdate : Date.now();
            // comment.lastUpdate = Date.now();
            //save comment
            comment.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Comment has been updated' });
            });
        });
    })
    //delete method for removing a comment from our database
    .delete(function(req, res) {
        //selects the comment by its ID, then removes it.
        Comment.remove({ _id: req.params.comment_id }, function(err, comment) {
            if (err)
                res.send(err);
            res.json({ message: 'Comment has been deleted' })
        })
    });

//=============================== users =============================
router.route('/users')
//retrieve all comments from the database
    .get(function(req, res) {
        //looks at our Comment Schema
        User.find(function(err, users) {
            if (err)
                res.send(err);
            //responds with a json object of our database comments.
            res.json(users)
        });
    })
    //post new comment to the database
    .post(function(req, res) {
        var user = new User();
        //body parser lets us use the req.body
        user.user = req.body.user;
        user.password = req.body.password;
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'User successfully added!' });
        });
    });

//Adding a route to a specific user based on the database username 'user'
router.route('/users/:user')
    .get(function(req, res) {
        //looks at our user Schema
        User.findOne({'user':req.params.user}, function(err, users) {
            if (err)
                res.send(err);

              var result = users
                    ? { success: true, user: users }
                    : { success: false, reason: 'user not found: ' + req.params.user };

            //responds with a json object of our database users.
            res.json(result)
        });
    })

//=============================== threads =============================
router.route('/threads')
    //retrieve all threads from the database
    .get(function(req, res) {
        //looks at our Thread Schema
        Thread.find(function(err, threads) {
            if (err)
                res.send(err);
            //responds with a json object of our database threads.
            res.json(threads)
        });
    })


//Use our router configuration when we call /api
//app.use('/api', router);
// Express only serves static assets in production
//if (process.env.NODE_ENV === 'production') {
  //app.use(express.static('build'));
  //app.use('/build', router);
//}

app.use(express.static(path.join(__dirname, '/build')));
//starts the server and listens for requests
app.listen(port, function() {
    console.log(`api running on port ${port}`);
});