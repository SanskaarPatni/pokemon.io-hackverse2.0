const express = require('express');
const http = require('http');
const cors = require('cors');
const axios = require('axios');;
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
var io = require('socket.io')(server, { origins: '*:*' });
app.use(router);
app.use(cors);

server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});