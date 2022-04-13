const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	admins: {
		type: Array,
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		mail: {
			type: String,
			required: true,
			unique: true,
			match: {/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/}
		},
		age: {
			type: Number,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: Date,
		required: true,
	},
	subject: String,
	picture: String,
	members: Array,
}, {
	collection: 'users',
	minimize: false,
	versionKey: false
}).set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id;

		delete ret._id;
	}
});

module.exports = Schema;