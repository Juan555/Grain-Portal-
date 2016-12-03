// Load required packages
var mongoose = require('mongoose');

// Define our soundEnvironment
var soundEnvironmentSchema = new mongoose.Schema({
    name: {type: String, default: Date.now},
    soundObjectIDArray: {type: [String], default: []},
    dateCreated: {type: Date, default: Date.now}
});

// Export the Mongoose model
module.exports = mongoose.model('soundEnvironment', soundEnvironmentSchema);
