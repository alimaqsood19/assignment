require('./server/config/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./server/database/mongoose.js');
const { User } = require('./server/model/user.js');
const { Post } = require('./server/model/post.js');
const _ = require('lodash');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

//Post ID will return specified post, populate 'likes' field, display which users like this post
app.get('/post/:id', (req, res) => {
    Post.findById({_id: req.params.id}).populate('likes').then((post) => { //Populates who has likes field
        const names = _.map(post.likes, 'name');
        res.send(names); //Display an array of user's names who have liked the post
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
});

app.post('/post', (req, res) => {

    var post = new Post({
        title: req.body.title
    });
    post.save().then((post) => {
        res.send(post);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.get('/user', (req, res) => {
    User.find().then((user) => {
        res.send(user);
    }).catch((err) => {
        res.send(err)
    });
});

app.post('/user', (req, res) => {
    var user = new User({
        name: req.body.name
    });
    user.save().then((user) => {
        res.send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.post('/like/:postId', (req, res) => {
    Post.findByIdAndUpdate({_id: req.params.postId}, {$set: req.body}, {new: true}).then((post) => {
        if (!post) {
            return res.status(404).send('not found');
        }
        res.send({
            post
        });
    }).catch((err) => {
        res.status(400).send("Invalid");
    });
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});