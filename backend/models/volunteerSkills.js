// VolunteerSkill model for the MangoDb database (not to be confused with the skill schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volunteerSkillSchema = new Schema({
    volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer'},
    skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill'},
});

module.exports = mongoose.model('VolunteerSkill', volunteerSkillSchema);