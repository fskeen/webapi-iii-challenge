const express = require('express');

const router = express.Router();

router.get('/', (req, res) => { // get all posts?

});

router.get('/:id', (req, res) => { // get a specific post?

});

router.delete('/:id', (req, res) => { // delete a specific post?

});

router.put('/:id', (req, res) => { // edit a specific post?

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;