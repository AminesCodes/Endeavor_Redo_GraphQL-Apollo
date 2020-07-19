// Fellow model for the MangoDb database (not to be confused with the fellow schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fellowSchema = new Schema({
    // email: { type: String, required: true, lowercase: true, trim: true },
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    picture: { type: String, default: '' },
    cohortId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cohort'},
    bio: { type: String, default: '' },
    linkedIn: { type: String, default: '' },
    github: { type: String, default: '' },
    wantMentor: { type: Boolean, default: false },
    eGrid: { type: Boolean, default: true },
    vGrid: { type: Boolean, default: true },
    created: { type: Date, required: true , default: Date.now },
    deleted: Date
});

module.exports = mongoose.model('Fellow', fellowSchema);