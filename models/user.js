// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// Define our user schema
var UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    soundEnvironmentIDArray: {type: [String], default: []} //array of ids of soundObjects
});

UserSchema.pre('save', function (next) {
	var user = this;
	if (this.isModified('password') || this.isNew) {
		bcrypt.genSalt(10, function (error, salt) {
			if (error) {
				return next(error);
			}
			bcrypt.hash(user.password, salt, function (error, hash) {
				if(error) {
					return next(error);
				}
				user.password = hash;
				next();
			});
		});
	} else {
		return next();
	}
});

UserSchema.methods.comparePassword = function(password, callback) {
	bcrypt.compare(password, this.password, function(error, passMatch) {
		if(error) {
			return callback(error);
		}
		callback(null, passMatch);
	});
};

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);