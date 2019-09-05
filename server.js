const express = require('express');
const server = express();
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')

server.use('/users', userRouter)
server.use('/posts', postRouter)


server.use(logger)
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.use(express.json())
//custom middleware

function logger(req, res, next) {
  console.log("Logging function:" , req.method, req.url, Date.now())
  next();
};

module.exports = server;
