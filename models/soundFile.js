// Load required packages
var mongoose = require('mongoose');

// Define our soundFile
var soundFileSchema = new mongoose.Schema({
    name: {type: String, required: true},
    imageLocation: {type: String, required: true},
    soundFileLocation: {type: String, required: true}
});

// Export the Mongoose model
module.exports = mongoose.model('soundFile', soundFileSchema);
