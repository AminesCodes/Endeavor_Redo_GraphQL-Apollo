// Volunteer model for the MangoDb database (not to be confused with the volunteer schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
    email: { type: String, required: true },
    mane: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    picture: String,
    confirmed: { type: Boolean, default: false },
    company: String,
    parsedCompany: String,
    title: String,
    v_bio: String,
    linkedIn: String,
    publicProfile: { type: Boolean, default: false },
    eGrid: { type: Boolean, default: true },
    vGrid: { type: Boolean, default: true },
    deleted: Date
});

module.exports = mongoose.model('Volunteer', volunteerSchema);