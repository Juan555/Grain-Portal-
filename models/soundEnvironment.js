// Load required packages
var mongoose = require('mongoose');

// Define our soundEnvironment
var soundEnvironmentSchema = new mongoose.Schema({
    name: {type: String, required: true},	//Unique in each user's scope
    soundObjectIDArray: {type: [String], default: []},
    userID: {type: String, required: true},	//Not optional, used to check for user environment with same name
    dateCreated: {type: Date, default: Date.now}
});

// Export the Mongoose model
module.exports = mongoose.model('soundEnvironment', soundEnvironmentSchema);
