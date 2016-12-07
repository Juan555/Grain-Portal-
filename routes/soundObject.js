var secrets = require('../config/secrets');
var SoundObject = require('../models/soundObject');

module.exports = function(router) {

    //Start /soundobjects endpoint

    var soundObjectRoute = router.route('/soundobjects');

    soundObjectRoute.get(function(req, res) {

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

            SoundObject.find().where(where).sort(sort).select(select).skip(skip).limit(limit).count().exec(function(error, soundObject) {
                if (error) {
                    var result = {};
                    result.message = "Server Error: SoundObject GET error with count";
                    result.data = [];
                    res.status(500);
                    res.json(result);
                    return;
                }

                var result = {};
                result.message = "Ok";
                result.data = soundObject;
                res.status(200);
                res.json(result);
                return;

            });
        } else {

            SoundObject.find().where(where).sort(sort).select(select).skip(skip).limit(limit).exec(function(error, soundObject) {
                if (error) {
                    var result = {};
                    result.message = "Server Error: SoundObject GET error";
                    result.data = [];
                    res.status(500);
                    res.json(result);
                    return;
                }

                var result = {};
                result.message = "Ok";
                result.data = soundObject;
                res.status(200);
                res.json(result);
                return;

            });
        }
    });

    soundObjectRoute.post(function(req, res) {

        var angle = req.body.angle;
        var soundFileID = req.body.soundFileID;
        var userID = req.body.userID

        var newSoundObject = new SoundObject({
            angle: angle,
            soundFileID: soundFileID,
            userID: userID
        });

        if (angle.length == 0 && soundFileID.length == 0) {
            var result = {};
            result.message = "Error: Angle and soundFileID are required";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }

        if (angle.length == 0) {
            var result = {};
            result.message = "Error: Angle is required";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }

        if (soundFileID.length == 0) {
            var result = {};
            result.message = "Error: soundFileID is required";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }

            newSoundObject.save(function(error) {
                if (error) {
                    var result = {};
                    result.message = "Server Error: Unable to save soundObject";
                    result.data = [];
                    res.status(500);
                    res.json(result);
                    return;
                }

                var result = {};
                result.message = "SoundObject added";
                result.data = newSoundObject;
                res.status(201);
                res.json(result);
                return;

            });
  
    });

    soundObjectRoute.options(function(req, res) {
        res.writeHead(200);
        res.end();
    });

    //Start /soundobjects/:id endpoint

    var soundObjectIDRoute = router.route('/soundobjects/:id');

    soundObjectIDRoute.get(function(req, res) {
        var id = req.params.id;

        SoundObject.findById(id, function(error, soundObject) {
            if (error) {
                var result = {};
                result.message = "Server Error: Error getting soundObject";
                result.data = [];
                res.status(500);
                res.json(result);
                return;
            } else if (soundObject == null) {
                var result = {};
                result.message = "Error: SoundObject not found";
                result.data = [];
                res.status(404);
                res.json(result);
            } else {
                var result = {};
                result.message = "Ok";
                result.data = soundObject;
                res.status(200);
                res.json(result);
                return;
            }
        });
    });

    soundObjectIDRoute.put(function(req, res) {
        var id = req.params.id;

        var angle = req.body.angle;
        var soundFileID = req.body.soundFileID;
        var userID = req.body.userID;

        if (angle.length == 0 || soundFileID.length == 0 || userID.length == 0) {
            var result = {};
            result.message = "Error: Missing data";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }


        SoundObject.findById(id, function(error, soundObject) {
            if (error) {
                var result = {};
                result.message = "Server Error: Unable to retrieve target soundObject";
                result.data = [];
                res.status(500);
                res.json(result);
                return;
            } else if (soundObject == null) {
                var result = {};
                result.message = "Error: SoundObject not found";
                result.data = [];
                res.status(404);
                res.json(result);
                return;
            } else {
                soundObject.angle = angle;
                soundObject.soundFileID = soundFileID;
                soundObject.userID = userID;

                soundObject.save(function(error) {
                    if (error) {
                        var result = {};
                        result.message = "Error: Unable to save soundObject";
                        result.data = [];
                        res.status(500);
                        res.json(result);
                        return;
                    } else {
                        var result = {};
                        result.message = "SoundObject updated";
                        result.data = soundObject;
                        res.status(200);
                        res.json(result);
                        return;
                    }
                });
            }
        });
    });

    soundObjectIDRoute.delete(function(req, res) {
        var id = req.params.id;

        SoundObject.findById(id, function(error, soundObject) {
            if (error) {
                var result = {};
                result.message = "Server Error: Unable to find soundObject";
                result.data = [];
                res.status(500);
                res.json(result);
                return;
            }

            if (soundObject == null) {
                var result = {};
                result.message = "Error: SoundObject not found";
                result.data = [];
                res.status(404);
                res.json(result);
                return;
            }

            soundObject.remove(function(error) {
                if (error) {
                    var result = {};
                    result.message = "Server Error: Unable to remove soundObject";
                    result.data = [];
                    res.status(500);
                    res.json(result);
                    return;
                } else {
                    var result = {};
                    result.message = "SoundObject deleted";
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
