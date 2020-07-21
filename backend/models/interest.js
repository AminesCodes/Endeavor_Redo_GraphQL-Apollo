// Field model for the MangoDb database (not to be confused with the field schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interestSchema = new Schema({
    interest: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Interest', interestSchema);