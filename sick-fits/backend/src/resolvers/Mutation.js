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
	updateItem(parent, args, ctx, info) {
		//first take a copy of the updates
		const updates = { ...args };
		//remove the ID from the updates
		delete updates.id;
		// run the update method
		return ctx.db.mutation.updateItem({
			data: updates,
			where: {
				id: args.id
			},
		},
		info
		);
	},
	async deleteItem(parent, args, ctx, info) {
		const where = {id: args.id};
		//1. find the item
		const item = await ctx.db.query.item({where}, `{id, title}`);
		//2. check if they own that item, or have the permissions
		//3. Delete it! 
		return ctx.db.mutation.deleteItem({where}, info);
	},
}

module.exports = Mutations;