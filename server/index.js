const http = require('http');
const app = require('./app/app');
const port = process.env.PORT || 8080;


const server = http.createServer(app);




server.listen(port, console.log(`The server is running at http://localhost:${port}`))