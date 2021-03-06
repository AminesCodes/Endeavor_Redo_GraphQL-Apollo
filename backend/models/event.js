// Event model for the MangoDb database (not to be confused with the admin schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    topic: { type: String, required: true, index: true },
    description: { type: String, required: true },
    staffDescription: { type: String, default: '' },
    attendees: { type: mongoose.Schema.Types.ObjectId, ref: 'Cohort'},
    location: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    numberOfVolunteers: { type: Number, default: 1 },
    volunteers:{
        confirmed: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Volunteer' }],
        pending: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Volunteer' }]
        },
    materialsUrl: { type: String, default: '' },
    important: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    deleted: Date
});

// eventSchema.post('save', async function(next){
// // eventSchema.pre('save', {query: false, document: true}, async function(next){
//     const test = this.materialsUrl
//     console.log('test', test)
//     // next()
// })

module.exports = mongoose.model('Event', eventSchema);