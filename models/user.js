// Load required packages
var mongoose = require('mongoose');

// Define our soundObject
var soundObjectSchema = new mongoose.Schema

// Define our beer schema
var UserSchema = new mongoose.Schema({
    name: String,
    email: Number,
    password: String,
    soundObject: soundObjectSchema
});

// Export the Mongoose model
module.exports = mongoose.model('Llama', LlamaSchema);