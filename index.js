// code away!
require('dotenv').config()
const server = require('./server')

const port = process.env.PORT || 8000;

server.listen(8000, () => console.log(`Server listening at port ${port}. Rock on!`))
