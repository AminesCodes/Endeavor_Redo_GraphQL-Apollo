// Fellow model for the MangoDb database (not to be confused with the fellow schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fellowSchema = new Schema({
    email: { type: String, required: true },
    mane: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    picture: String,
    cohortId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cohort'},
    bio: String,
    linkedIn: String,
    github: String,
    wantMentor: { type: Boolean, default: false },
    eGrid: { type: Boolean, default: true },
    vGrid: { type: Boolean, default: true },
    deleted: Date
});

module.exports = mongoose.model('Fellow', fellowSchema);