const Mutations = {
	async createItem(parents, args, ctx, info) {
		// TODO: Check if they are logged in
		const item = await ctx.db.mutation.createItem({
			// ctx.db.mutation.createItem returns a promise and if we want the item to go into the 
			// item value we need to make it an async method
			data: {
				...args
			}
			// needs access to the info item that get passed because the query lives inside this info
			// the ctx.db.mutation needs to take the query from the frontend and pass it to our backend
			// and that will specify which data will get returned from the database when we create it
		}, info);
		return item;
	},
}

module.exports = Mutations;