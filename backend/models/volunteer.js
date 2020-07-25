// Volunteer model for the MangoDb database (not to be confused with the volunteer schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
    name: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    picture: { type: String, trim: true, default: '' },
    confirmed: { type: Boolean, default: false },
    company: { type: String, required: true, trim: true },
    parsedCompany: { type: String, required: true, lowercase: true, trim: true, index: true },
    title: { type: String, required: true, trim: true },
    bio: { type: String, trim: true, default: '' },
    linkedIn: { type: String, trim: true, default: '' },
    publicProfile: { type: Boolean, default: false },
    skills: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    interests: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Field' }],
    events:{
        confirmed: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Event' }],
        pending: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Event' }]
        },
    eGrid: { type: Boolean, default: true },
    vGrid: { type: Boolean, default: true },
    created: { type: Date, required: true , default: Date.now },
    deleted: Date
});

module.exports = mongoose.model('Volunteer', volunteerSchema);