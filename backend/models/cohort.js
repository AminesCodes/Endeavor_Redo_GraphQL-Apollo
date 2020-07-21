// Cohort model for the MangoDb database (not to be confused with the cohort schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cohortSchema = new Schema({
    cohort: { type: String, required: true, unique: true },
    class: { type: String, required: true },
});

module.exports = mongoose.model('Cohort', cohortSchema);