// VolunteerField model for the MangoDb database (not to be confused with the volunteerField schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volunteerFieldSchema = new Schema({
    volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer'},
    fieldId: { type: mongoose.Schema.Types.ObjectId, ref: 'Field'},
});
// Unique constrain on the combination of volunteerId, fieldId
volunteerFieldSchema.index({ volunteerId: 1, fieldId: 1 }, { unique: true });

module.exports = mongoose.model('VolunteerSkill', volunteerFieldSchema);