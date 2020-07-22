// admin model for the MangoDb database (not to be confused with the admin schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    picture: { type: String, trim: true, default: '' },
    eGrid: { type: Boolean, default: true },
    vGrid: { type: Boolean, default: true },
    created: { type: Date, required: true , default: Date.now },
    deleted: Date
});

module.exports = mongoose.model('Admin', adminSchema);