// Skill model for the MangoDb database (not to be confused with the skill schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    skill: { type: String, required: true }
});

module.exports = mongoose.model('Skill', skillSchema);