// Load required packages
var mongoose = require('mongoose');

var userSoundObject = new mongoose.Schema({
    angle: Number,
    sound_id: String
});

// Define our user schema
var UserSchema = new mongoose.Schema({
    name: String,
    email: Number,
    password: String,
    soundObject: [userSoundObject] //array of ids of soundObjects
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);