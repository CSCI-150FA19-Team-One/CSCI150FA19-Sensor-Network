const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const user_schema = new Schema({
	username: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	}

});


const User = mongoose.model('User', user_schema);
module.exports = User;