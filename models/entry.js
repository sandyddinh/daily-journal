const { Schema, model } = require('mongoose');

const entrySchema = new Schema({
    time: { type: Date, require: true},
    feelings: String,
    care: String,
    manifestations: String,
    goals: String
}, {
    timestamps: true
});

module.exports = model('Entry', entrySchema);