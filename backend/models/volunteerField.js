// VolunteerField model for the MangoDb database (not to be confused with the volunteerField schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volunteerFieldSchema = new Schema({
    volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer'},
    fieldId: { type: mongoose.Schema.Types.ObjectId, ref: 'Field'},
});

module.exports = mongoose.model('VolunteerSkill', volunteerFieldSchema);