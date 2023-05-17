const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
	title: String,
	body: String,
	author: String,
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('news', newsSchema);
