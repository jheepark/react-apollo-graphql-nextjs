const { forwardTo } = require('prisma-binding');

const Query = {
	items: forwardTo('db'),
	item: forwardTo('db'),
	itemsConnection: forwardTo('db'),
	me(parent, args, ctx, info) {
		//check if there is a current user ID
		if(!ctx.request.userId) {
			return null;
		}
		return ctx.db.query.user({
			where: {id: ctx.request.userId},
		}, info);
	}
};
// this allows us to use the exact same api on the server as well as on the client.

module.exports = Query;
