require('dotenv').config({path: 'variables.env'});
const createServer = require('createServer');
const db = require('./db');

const server = createServer();

// Todo Use express middleware to handle cookies (JWT)
// Todo Use express middleware to populate current user

server.start({
  // we only want to endpoint to be visited from our approved urls
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
}, deets => {
  console.log(`Server is now running on port https:/localhost:${deets.port}`)
});
