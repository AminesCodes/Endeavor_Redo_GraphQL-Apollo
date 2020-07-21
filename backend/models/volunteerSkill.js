// VolunteerSkill model for the MangoDb database (not to be confused with the skill schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volunteerSkillSchema = new Schema({
    volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer'},
    skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill'},
});
// Unique constrain on the combination of volunteerId, skillId
volunteerSkillSchema.index({ volunteerId: 1, skillId: 1 }, { unique: true });

module.exports = mongoose.model('VolunteerSkill', volunteerSkillSchema);