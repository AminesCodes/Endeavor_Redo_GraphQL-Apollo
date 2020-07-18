// Fellow model for the MangoDb database (not to be confused with the fellow schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fellowSchema = new Schema({
    email: String,
    mane: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    picture: String,
    cohortId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cohort'},
    bio: String,
    linkedIn: String,
    github: String,
    wantMentor: Boolean,
    e_grid: Boolean,
    v_grid: Boolean,
    deleted: Date
});

module.exports = mongoose.model('Fellow', fellowSchema);