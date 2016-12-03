/*
 * Connect all of your endpoints together here.
 */
module.exports = function(app, router) {
    app.use('/api', require('./home.js')(router));
    app.use('/api', require('./llama.js')(router));
    app.use('/api', require('./user.js')(router));
    app.use('/api', require('./soundEnvironment.js')(router));
    app.use('/api', require('./soundObject.js')(router));
    app.use('/api', require('./soundFile.js')(router));
};
