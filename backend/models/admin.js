// admin model for the MangoDb database (not to be confused with the admin schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: { type: String, required: true },
    mane: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    picture: String,
    admin: { type: Boolean, default: false },
    eGrid: { type: Boolean, default: true },
    vGrid: { type: Boolean, default: true },
    deleted: Date
});

module.exports = mongoose.model('Admin', adminSchema);