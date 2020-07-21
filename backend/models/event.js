// Event model for the MangoDb database (not to be confused with the admin schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    topic: { type: String, required: true },
    description: { type: String, required: true },
    staffDescription: { type: String, default: '' },
    attendees: { type: mongoose.Schema.Types.ObjectId, ref: 'Cohort'},
    location: { type: String, required: true },
    instructor: { type: String, required: true },
    numberOfVolunteers: Number,
    materialsUrl: { type: String, default: '' },
    important: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    deleted: Date
});

module.exports = mongoose.model('Event', adminSchema);