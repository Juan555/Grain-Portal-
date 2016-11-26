// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    soundObjectIDArray: {type: [String], default: []} //array of ids of soundObjects
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);