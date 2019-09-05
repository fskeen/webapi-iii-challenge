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

router.delete('/:id', (req, res) => { // delete a specific post?

});

router.put('/:id', (req, res) => { // edit a specific post?

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