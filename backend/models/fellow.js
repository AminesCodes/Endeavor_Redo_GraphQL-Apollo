// Fellow model for the MangoDb database (not to be confused with the fellow schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fellowSchema = new Schema({
    name: { type: String, required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    picture: { type: String, trim: true, default: '' },
    cohortId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cohort', required: true},
    bio: { type: String, default: '' },
    linkedIn: { type: String, default: '' },
    github: { type: String, default: '' },
    wantMentor: { type: Boolean, default: false },
    eGrid: { type: Boolean, default: true },
    vGrid: { type: Boolean, default: true },
    created: { type: Date, default: Date.now },
    deleted: Date
});

module.exports = mongoose.model('Fellow', fellowSchema);