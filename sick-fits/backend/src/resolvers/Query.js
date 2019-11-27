const { forwardTo } = require('prisma-binding');

const Query = {
	items: forwardTo('db'),
	item: forwardTo('db'),
};
// this allows us to use the exact same api on the server as well as on the client.

module.exports = Query;
