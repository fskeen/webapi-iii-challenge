const express = require('express');
const router = express.Router();
const db = require('./userDb');
const postdb = require('../posts/postDb');

router.use(express.json())

router.post('/', validateUser, (req, res) => { // create user?
    // validateUser()
    const userData = req.body;

    db.insert(userData)
        .then((user) => {
            console.log("user created!")
            res.status(201).json({
                user: user
            })
        })
        .catch(() => {
            res.status(500).json({
                error: "There was an error adding the user to the database."
            })
        })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => { // add a post from a specific user?
    // const id = req.params.id;
    const newPost = req.body;
    postdb.insert(newPost)
        .then((post) => {
            console.log("New post created!")
            res.status(201).json({
                post: post
            })
        })
        .catch(() => {
            res.status(500).json({
                error: "There was an error adding the post to the database."
            })
        })

});

router.get('/', (req, res) => { // get all users?
    db.get()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({
                errorMessage: "The user list could not be retrieved."
            })
        })
});

router.get('/:id', validateUserId, (req, res) => { // get a specific user?
    // validateUserId()
    res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => { // get a specific user's posts?
    //validateUserId()
    const id = req.params.id;
    db.getUserPosts(id)
        .then(posts => {
            res.status(200).json({
                Posts: posts
            })
        })
        .catch(() => {
            res.status(500).json({
                error: "We couldn't retrieve posts for this user."
            })
        })

});

router.delete('/:id', validateUserId, (req, res) => { // delete a user?
    // validateUserId()
    const id = req.params.id
    db.remove(id)
        .then((numDeleted) => {
            if (numDeleted > 0) {
                res.status(200).json({
                    message: "Deleted user."
                })
            } else {
                res.status(500).json({
                    error: "Unable to delete that user. They are too powerful."
                })
            }
        })

});

router.put('/:id', validateUserId, (req, res) => { // edit a user?
    // validateUserId()
    const id = req.params.id;
    const changes = req.body;
    db.update(id, changes)
        .then(editSuccess => {
            if (editSuccess) {
                res.status(200).json({
                    message: "Successfully edited requested resource."
                })
            } else {
                res.status(500).json({
                    error: "Unable to edit the requested resource."
                })
            }
        })
        .catch(() => {
            res.status(500).json({
                error: "Unable to edit the requested resource."
            })
        })
});

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id
    console.log("Validating by user ID!")

    db.getById(id)
    .then((user) => {
        if (user.name) {
            req.user = user
            next()
        }
    })
    .catch(() => {
        res.status(404).json({
            error: "Couldn't find a user by that ID in the system."
        })
    })       
};

function validateUser(req, res, next) {
    console.log("I'm validating the request body!")

    if (!req.body) {
        res.status(400).json({
            message: "Missing user data."
        })
    } else if (!req.body.name){
        res.status(400).json({
            message: "Missing required name field."
        })
    } else {
       next() 
    }
    
};

function validatePost(req, res, next) {
    console.log("I'm validating a new blog post.")
    if (!req.body) {
        res.status(400).json({
            message: "Missing post data."
        })
    } else if (!req.body.text){
        res.status(400).json({
            message: "Missing required text field."
        })
    } else {
       next() 
    }
};

module.exports = router;
