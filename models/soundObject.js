// Load required packages
var mongoose = require('mongoose');

// Define our soundObject
var soundObjectSchema = new mongoose.Schema({
    angle: {type: Number, required: true},
    soundFileID: {type: String, required: true},
    userID: {type: String, default: ""}	//optional, for two-way referencing if desired
});

// Export the Mongoose model
module.exports = mongoose.model('soundObject', soundObjectSchema);
