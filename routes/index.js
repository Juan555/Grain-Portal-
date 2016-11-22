/*
 * Connect all of your endpoints together here.
 */
var path = require('path');

module.exports = function(app, router) {
    app.use('/api', require('./home.js')(router));
    app.use('/api', require('./llama.js')(router));


    app.get('*', function(req, res) {
        // load our public/index.html file
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });


};
