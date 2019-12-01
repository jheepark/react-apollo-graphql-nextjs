const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config({path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser()); // allows us to use any express middleware;
// TODO User express middleware to handle cookies (JWT)

// decode the JWT so we can get the user ID on each request
server.express.use((req, res, next) => {
	const { token } = req.cookies;
	//decode token
	if(token) {
		const {userId} = jwt.verify(token, process.env.APP_SECRET);
		//put the userId onto the request for further requests to access
		req.userId = userId;
	}
	next();
});
// TODO User express middleware to populate current user

server.start({
	cors: {
		credentials: true,
		origin: process.env.FRONTEND_URL,
	}, 
}, deets => {
	console.log(`Server is now running on port http://localhost:${deets.port}`);
})