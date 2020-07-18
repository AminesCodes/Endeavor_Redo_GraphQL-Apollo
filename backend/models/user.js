// User model for the MangoDb database (not to be confused with the user schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    role: String
});

module.exports = mongoose.model('User', userSchema);