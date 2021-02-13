const { Schema, model } = require('mongoose');

const quoteSchema = new Schema(
	{
		quote: String,
		author: String
	}
);

module.exports = model('Quote', quoteSchema);
