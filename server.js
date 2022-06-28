const express = require('express');
const cors = require('cors');
const server = express();

server.use(express.json());
server.use(cors());

const router = require('./router');

server.use('/api', router);


server.listen(8080, () => {
    console.log("Server listening port 8080");
})

