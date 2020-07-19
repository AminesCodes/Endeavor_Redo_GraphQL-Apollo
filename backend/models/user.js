// User model for the MangoDb database (not to be confused with the user schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    created: { type: Date, required: true , default: Date.now },
    deleted: Date
});

module.exports = mongoose.model('User', userSchema);