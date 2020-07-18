// Volunteer model for the MangoDb database (not to be confused with the volunteer schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
    email: String,
    mane: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    picture: String,
    cohortId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cohort'},
    confirmed: Boolean,
    company: String,
    parsedCompany: String,
    title: String,
    v_bio: String,
    linkedIn: String,
    publicProfile: Boolean,
    e_grid: Boolean,
    v_grid: Boolean,
    deleted: Date
});

module.exports = mongoose.model('Volunteer', volunteerSchema);