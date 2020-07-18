// admin model for the MangoDb database (not to be confused with the admin schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: String,
    mane: String,
    userId: String,
    admin: Boolean,
    e_grid: Boolean,
    v_grid: Boolean,
    deleted: Date
});

module.exports = mongoose.model('Admin', adminSchema);