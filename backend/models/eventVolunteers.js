const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventVolunteerSchema = new Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'event', required: true },
    volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    confirmed: { type: Boolean, required: true, default: false },
    deleted: Date
});
eventVolunteerSchema.index({ eventId: 1, volunteerId: 1 }, { unique: true });


module.exports = mongoose.model('EventVolunteer', eventVolunteerSchema);