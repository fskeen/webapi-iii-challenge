const express = require('express');
const router = express.Router();
const db = require('./userDb')

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

router.post('/:id/posts', (req, res) => { // add a post from a specific user?

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

    console.log("I'm a get request and I am running!")

    res.status(200).json({
        user: req.user
    })
});

router.get('/:id/posts', validateUserId, (req, res) => { // get a specific user's posts?
    //validateUserId()


});

router.delete('/:id', (req, res) => { // delete a user?
    // validateUserId()

});

router.put('/:id', (req, res) => { // edit a user?
    // validateUserId()

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
        } else {
            res.status(404).json({
                error: "That's not a valid user ID."
            })
        }
    })
    .catch(() => {
        res.status(500).json({
            error: "For some reason, we couldn't get a user by that ID from the server."
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

};

module.exports = router;
