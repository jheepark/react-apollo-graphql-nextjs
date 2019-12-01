const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
	async signup(parent, args, ctx, info) {
		args.email = args.email.toLowerCase();
		//hash their password
		const password = await bcrypt.hash(args.password, 10); // you either give it a salt or get it to auto generate a salt of a parsed length
		//create the user in the database
		const user = await ctx.db.mutation.createUser({
			data: {
				...args,
				password,
				permissions: { set: ['USER']} //because permissions is a custom enum
			}
		}, info);
		//create the JWT token for them
		const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
		//we set the jwt as a cookie on the response
		ctx.response.cookie('token', token, {
			httpOnly: true, //we cannot access this token via javascript
			maxAge: 1000 * 60 * 60 * 24 *  365 //how long you want this cookie to last - this will be one year
		});
		// return the user to the browser
		return user;
	},
	async signin(parent, {email, password}, ctx, info) {
		// 1. check if there is a user with that email
		const user = await ctx.db.query.user({ where: { email }});
		if (!user) {
			throw new Error (`No such user found for email ${email}`);
		}
		// 2. check if their password is correct
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new Error('Invalid Password!');
		}
		// 3. generate the JWT token
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		// 4. set the cookie with the token
		ctx.response.cookie('token', token, {
			httpOnly: true, //we cannot access this token via javascript
			maxAge: 1000 * 60 * 60 * 24 * 365, //how long you want this cookie to last - this will be one year
		});
		//5. return the user
		return user;
	},
	signout(parent, args, ctx, info) {
		ctx.response.clearCookie('token');
		return {message: 'Goodbye!'};
	},
}

module.exports = Mutations;