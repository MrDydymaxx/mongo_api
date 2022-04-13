const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	event: {
		type: Array,
		{
			organisation: {
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
			date: {
				type: Date,
				required: true,
			},
			description: {
				type: Date,
				required: true,
			},
			photo: {
				type: Array,
				{
					member: {
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
					picture: String,
				},
				url: String,
				}
			}
			participants: Array,
		}
	}
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