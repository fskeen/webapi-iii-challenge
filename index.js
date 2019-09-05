// code away!
require('dotenv').config()
const server = require('./server')

const port = 8000;

server.listen(8000, () => console.log(`Server listening at port ${port}. Rock on!`))
