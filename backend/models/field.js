// Field model for the MangoDb database (not to be confused with the field schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fieldSchema = new Schema({
    field: { type: String, required: true }
});

module.exports = mongoose.model('Field', fieldSchema);