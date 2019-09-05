const express = require('express');
const router = express.Router();
const postdb = require('../posts/postDb');

router.use(express.json())


router.get('/', (req, res) => { // get all posts?
    postdb.get()
        .then((posts) => {
            res.status(200).json({
                posts: posts
            })
        })
        .catch(() => {
            res.status(500).json({
                error: "Error getting posts from server."
            })
        })
});

router.get('/:id', validatePostId, (req, res) => { // get a specific post?
    res.status(200).json({
        post: req.post
    })
});

router.delete('/:id', validatePostId, (req, res) => { // delete a specific post?
    const id = req.params.id;
    postdb.remove(id)
    .then((numDeleted) => {
        if (numDeleted > 0) {
            res.status(200).json({
                message: "Deleted post."
            })
        } else {
            res.status(500).json({
                error: "Unable to delete that post. It is too good."
            })
        }
    })
});

router.put('/:id', validatePostId, (req, res) => { // edit a specific post?
    const id = req.params.id;
    const changes = req.body;
    postdb.update(id, changes)
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

// custom middleware

function validatePostId(req, res, next) {
 const id = req.params.id
    console.log("Validating by post ID!")

    postdb.getById(id)
    .then((post) => {
        if (post.text) {
            req.post = post
            next()
        }
    })
    .catch(() => {
        res.status(404).json({
            error: "Couldn't find that post in the system."
        })
    }) 
};

module.exports = router;