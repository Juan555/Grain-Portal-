var secrets = require('../config/secrets');
var SoundFile = require('../models/soundFile');

module.exports = function(router) {

    //Start /soundfiles endpoint

    var soundFileRoute = router.route('/soundfiles');

    soundFileRoute.get(function(req, res) {

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

            SoundFile.find().where(where).sort(sort).select(select).skip(skip).limit(limit).count().exec(function(error, soundFile) {
                if (error) {
                    var result = {};
                    result.message = "Server Error: SoundFile GET error with count";
                    result.data = [];
                    res.status(500);
                    res.json(result);
                    return;
                }

                var result = {};
                result.message = "Ok";
                result.data = soundFile;
                res.status(200);
                res.json(result);
                return;

            });
        } else {

            SoundFile.find().where(where).sort(sort).select(select).skip(skip).limit(limit).exec(function(error, soundFile) {
                if (error) {
                    var result = {};
                    result.message = "Server Error: SoundFile GET error";
                    result.data = [];
                    res.status(500);
                    res.json(result);
                    return;
                }

                var result = {};
                result.message = "Ok";
                result.data = soundFile;
                res.status(200);
                res.json(result);
                return;

            });
        }
    });

    soundFileRoute.post(function(req, res) {

        var name = req.body.name;
        var imageLocation = req.body.imageLocation;
        var soundFileLocation = req.body.soundFileLocation

        var newSoundFile = new SoundFile({
            name: name,
            imageLocation: imageLocation,
            soundFileLocation: soundFileLocation
        });

        if (name.length == 0 && imageLocation.length == 0) {
            var result = {};
            result.message = "Error: Name and imageLocation are required";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }

        if (name.length == 0 && soundFileLocation.length == 0) {
            var result = {};
            result.message = "Error: Name and soundFileLocation are required";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }

        if (imageLocation.length == 0 && soundFileLocation.length == 0) {
            var result = {};
            result.message = "Error: imageLocation and soundFileLocation are required";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }

        if (name.length == 0) {
            var result = {};
            result.message = "Error: Name is required";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }

        if (imageLocation.length == 0) {
            var result = {};
            result.message = "Error: imageLocation is required";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }

        if (soundFileLocation.length == 0) {
            var result = {};
            result.message = "Error: soundFileLocation is required";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }

        SoundFile.findOne({ soundFileLocation: soundFileLocation }, function(error, soundFile) {

            if (error) {
                var result = {};
                result.message = "Server Error: Error finding soundFile with same soundFileLocation";
                result.data = [];
                res.status(500);
                res.json(result);
                return;
            }

            if (soundFile) {

                var result = {};
                result.message = "Error: This soundFileLocation already exists";
                result.data = [];
                res.status(400);
                res.json(result);
                return;

            }

            newSoundFile.save(function(error) {
                if (error) {
                    var result = {};
                    result.message = "Server Error: Unable to save soundFile";
                    result.data = [];
                    res.status(500);
                    res.json(result);
                    return;
                }

                var result = {};
                result.message = "SoundFile added";
                result.data = newSoundFile;
                res.status(201);
                res.json(result);
                return;

            });
        });
    });

    soundFileRoute.options(function(req, res) {
        res.writeHead(200);
        res.end();
    });

    //Start /soundfiles/:id endpoint

    var soundFileIDRoute = router.route('/soundfiles/:id');

    soundFileIDRoute.get(function(req, res) {
        var id = req.params.id;

        SoundFile.findById(id, function(error, soundFile) {
            if (error) {
                var result = {};
                result.message = "Server Error: Error getting soundFile";
                result.data = [];
                res.status(500);
                res.json(result);
                return;
            } else if (soundFile == null) {
                var result = {};
                result.message = "Error: SoundFile not found";
                result.data = [];
                res.status(404);
                res.json(result);
            } else {
                var result = {};
                result.message = "Ok";
                result.data = soundFile;
                res.status(200);
                res.json(result);
                return;
            }
        });
    });

    soundFileIDRoute.put(function(req, res) {
        var id = req.params.id;

        var name = req.body.name;
        var imageLocation = req.body.imageLocation;
        var soundFileLocation = req.body.soundFileLocation;

        if (name.length == 0 || imageLocation.length == 0 || soundFileLocation.length == 0) {
            var result = {};
            result.message = "Error: Missing data";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }


        SoundFile.findById(id, function(error, soundFile) {
            if (error) {
                var result = {};
                result.message = "Server Error: Unable to retrieve target soundFile";
                result.data = [];
                res.status(500);
                res.json(result);
                return;
            } else if (soundFile == null) {
                var result = {};
                result.message = "Error: SoundFile not found";
                result.data = [];
                res.status(404);
                res.json(result);
                return;
            } else {
                soundFile.name = name;
                soundFile.imageLocation = imageLocation;
                soundFile.soundFileLocation = soundFileLocation;

                soundFile.save(function(error) {
                    if (error) {
                        var result = {};
                        result.message = "Error: Unable to save soundFile";
                        result.data = [];
                        res.status(500);
                        res.json(result);
                        return;
                    } else {
                        var result = {};
                        result.message = "SoundFile updated";
                        result.data = soundFile;
                        res.status(200);
                        res.json(result);
                        return;
                    }
                });
            }
        });
    });

    soundFileIDRoute.delete(function(req, res) {
        var id = req.params.id;

        SoundFile.findById(id, function(error, soundFile) {
            if (error) {
                var result = {};
                result.message = "Server Error: Unable to find soundFile";
                result.data = [];
                res.status(500);
                res.json(result);
                return;
            }

            if (soundFile == null) {
                var result = {};
                result.message = "Error: SoundFile not found";
                result.data = [];
                res.status(404);
                res.json(result);
                return;
            }

            soundFile.remove(function(error) {
                if (error) {
                    var result = {};
                    result.message = "Server Error: Unable to remove soundFile";
                    result.data = [];
                    res.status(500);
                    res.json(result);
                    return;
                } else {
                    var result = {};
                    result.message = "SoundFile deleted";
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
