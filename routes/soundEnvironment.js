var secrets = require('../config/secrets');
var SoundEnvironment = require('../models/soundEnvironment');

module.exports = function(router) {

    //Start /soundenvironments endpoint

    var soundEnvironmentRoute = router.route('/soundenvironments');

    soundEnvironmentRoute.get(function(req, res) {

        var where = req.query['where'];
        where = eval("(" + where + ")");
        where = where == undefined ? "" : where;

        var sort = req.query['sort'];
        sort = eval("(" + sort + ")");
        sort = sort == undefined ? "" : sort;

        var select = req.query['select'];
        select = eval("(" + select + ")");
        select = select == undefined ? "" : select;


        var skip = req.query['skip'];
        skip = skip == undefined ? 0 : parseInt(skip, 10);

        var limit = req.query['limit'];
        limit = limit == undefined ? "" : parseInt(limit, 10);

        var count = req.query['count'];
        count = count == undefined ? false : (count === 'true');

        if (count) {

            SoundEnvironment.find().where(where).sort(sort).select(select).skip(skip).limit(limit).count().exec(function(error, soundEnvironment) {
                if (error) {
                    var result = {};
                    result.message = "Server Error: SoundEnvironment GET error with count";
                    result.data = [];
                    res.status(500);
                    res.json(result);
                    return;
                }

                var result = {};
                result.message = "Ok";
                result.data = soundEnvironment;
                res.status(200);
                res.json(result);
                return;

            });
        } else {

            SoundEnvironment.find().where(where).sort(sort).select(select).skip(skip).limit(limit).exec(function(error, soundEnvironment) {
                if (error) {
                    var result = {};
                    result.message = "Server Error: SoundEnvironment GET error";
                    result.data = [];
                    res.status(500);
                    res.json(result);
                    return;
                }

                var result = {};
                result.message = "Ok";
                result.data = soundEnvironment;
                res.status(200);
                res.json(result);
                return;

            });
        }
    });

    soundEnvironmentRoute.post(function(req, res) {

        var name = req.body.name;
        var soundObjectIDArray = req.body.soundObjectIDArray;
        var userID = req.body.userID;

        var newSoundEnvironment = new SoundEnvironment({
            name: name,
            soundObjectIDArray: soundObjectIDArray,
            userID: userID
        });

        if (name.length == 0) {
            var result = {};
            result.message = "Error: Name is required";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }

        SoundEnvironment.findOne({ name: name, userID: userID }, function(error, soundEnvironment) {

            if (error) {
                var result = {};
                result.message = "Server Error: Error finding soundEnvironment with same name and userID";
                result.data = [];
                res.status(500);
                res.json(result);
                return;
            }

            if (soundEnvironment) {

                var result = {};
                result.message = "Error: A soundEnvironment with this name and userID already exists";
                result.data = [];
                res.status(400);
                res.json(result);
                return;

            }

            newSoundEnvironment.save(function(error) {
                if (error) {
                    var result = {};
                    result.message = "Server Error: Unable to save soundEnvironment";
                    result.data = [];
                    res.status(500);
                    res.json(result);
                    return;
                }

                var result = {};
                result.message = "SoundEnvironment added";
                result.data = newSoundEnvironment;
                res.status(201);
                res.json(result);
                return;

            });
        });
    });

    soundEnvironmentRoute.options(function(req, res) {
        res.writeHead(200);
        res.end();
    });

    //Start /soundenvironments/:id endpoint

    var soundEnvironmentIDRoute = router.route('/soundenvironments/:id');

    soundEnvironmentIDRoute.get(function(req, res) {
        var id = req.params.id;

        SoundEnvironment.findById(id, function(error, soundEnvironment) {
            if (error) {
                var result = {};
                result.message = "Server Error: Error getting soundEnvironment";
                result.data = [];
                res.status(500);
                res.json(result);
                return;
            } else if (soundEnvironment == null) {
                var result = {};
                result.message = "Error: SoundEnvironment not found";
                result.data = [];
                res.status(404);
                res.json(result);
            } else {
                var result = {};
                result.message = "Ok";
                result.data = soundEnvironment;
                res.status(200);
                res.json(result);
                return;
            }
        });
    });

    soundEnvironmentIDRoute.put(function(req, res) {
        var id = req.params.id;

        var name = req.body.name;
        var soundObjectIDArray = req.body.soundObjectIDArray;
        var userID = req.body.userID;

        if (name.length == 0 || soundFileID.length == 0 || userID.length == 0) {
            var result = {};
            result.message = "Error: Missing data";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }


        SoundEnvironment.findById(id, function(error, soundEnvironment) {
            if (error) {
                var result = {};
                result.message = "Server Error: Unable to retrieve target soundEnvironment";
                result.data = [];
                res.status(500);
                res.json(result);
                return;
            } else if (soundEnvironment == null) {
                var result = {};
                result.message = "Error: SoundEnvironment not found";
                result.data = [];
                res.status(404);
                res.json(result);
                return;
            } else {
                soundEnvironment.name = name;
                soundEnvironment.soundObjectIDArray = soundObjectIDArray;
                soundEnvironment.userID = userID;

                soundEnvironment.save(function(error) {
                    if (error) {
                        var result = {};
                        result.message = "Error: Unable to save soundEnvironment";
                        result.data = [];
                        res.status(500);
                        res.json(result);
                        return;
                    } else {
                        var result = {};
                        result.message = "SoundEnvironment updated";
                        result.data = soundEnvironment;
                        res.status(200);
                        res.json(result);
                        return;
                    }
                });
            }
        });
    });

    soundEnvironmentIDRoute.delete(function(req, res) {
        var id = req.params.id;

        SoundEnvironment.findById(id, function(error, soundEnvironment) {
            if (error) {
                var result = {};
                result.message = "Server Error: Unable to find soundEnvironment";
                result.data = [];
                res.status(500);
                res.json(result);
                return;
            }

            if (soundEnvironment == null) {
                var result = {};
                result.message = "Error: SoundEnvironment not found";
                result.data = [];
                res.status(404);
                res.json(result);
                return;
            }

            soundEnvironment.remove(function(error) {
                if (error) {
                    var result = {};
                    result.message = "Server Error: Unable to remove soundEnvironment";
                    result.data = [];
                    res.status(500);
                    res.json(result);
                    return;
                } else {
                    var result = {};
                    result.message = "SoundEnvironment deleted";
                    result.data = [];
                    res.status(200);
                    res.json(result);
                    return;
                }
            });
        });
    })

    return router;
}
