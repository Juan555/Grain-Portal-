// Load required packages
var mongoose = require('mongoose');

// Define our soundObject
var soundObjectSchema = new mongoose.Schema({
    name: String,
    imageLocation: String,
    soundFileLocation: String
});

// Export the Mongoose model
module.exports = mongoose.model('soundObject', soundObjectSchema);
