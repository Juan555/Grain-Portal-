// Citation: /userauth from https://devdactic.com/restful-api-user-authentication-1/

var secrets = require('../config/secrets');
var User = require('../models/user');
var jwt = require('jwt-simple');

module.exports = function(router) {

    //Start /users endpoint

    var userRoute = router.route('/users');

    userRoute.get(function(req, res) {

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

            User.find().where(where).sort(sort).select(select).skip(skip).limit(limit).count().exec(function(error, user) {
                if (error) {
                    var result = {};
                    result.message = "Server Error: User GET error with count";
                    result.data = [];
                    res.status(500);
                    res.json(result);
                    return;
                }

                var result = {};
                result.message = "Ok";
                result.data = user;
                res.status(200);
                res.json(result);
                return;

            });
        } else {

            User.find().where(where).sort(sort).select(select).skip(skip).limit(limit).exec(function(error, user) {
                if (error) {
                    var result = {};
                    result.message = "Server Error: User GET error";
                    result.data = [];
                    res.status(500);
                    res.json(result);
                    return;
                }

                var result = {};
                result.message = "Ok";
                result.data = user;
                res.status(200);
                res.json(result);
                return;

            });
        }
    });

    userRoute.post(function(req, res) {

        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password

        var newUser = new User({
            username: username,
            email: email,
            password: password
        });

        if (username.length == 0 && email.length == 0) {
            var result = {};
            result.message = "Error: Username and email are required";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }

        if (username.length == 0 && password.length == 0) {
            var result = {};
            result.message = "Error: Username and password are required";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }

        if (email.length == 0 && password.length == 0) {
            var result = {};
            result.message = "Error: Email and password are required";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }

        if (username.length == 0) {
            var result = {};
            result.message = "Error: Username is required";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }

        if (email.length == 0) {
            var result = {};
            result.message = "Error: Email is required";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }

        if (password.length == 0) {
            var result = {};
            result.message = "Error: Password is required";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }
        User.findOne({ username: username }, function(error, user) {

            if (error) {
                var result = {};
                result.message = "Server Error: Error finding user with same username";
                result.data = [];
                res.status(500);
                res.json(result);
                return;
            }

            if (user) {

                var result = {};
                result.message = "Error: This username already exists";
                result.data = [];
                res.status(400);
                res.json(result);
                return;

            }

            User.findOne({ email: email }, function(error, user) {

                if (error) {
                    var result = {};
                    result.message = "Server Error: Error finding user with same email";
                    result.data = [];
                    res.status(500);
                    res.json(result);
                    return;
                }

                if (user) {

                    var result = {};
                    result.message = "Error: This email already exists";
                    result.data = [];
                    res.status(400);
                    res.json(result);
                    return;

                }

                newUser.save(function(error) {
                    if (error) {
                        var result = {};
                        result.message = "Server Error: Unable to save user " + error;
                        result.data = [];
                        res.status(500);
                        res.json(result);
                        return;
                    }

                    var result = {};
                    result.message = "User added";
                    result.data = newUser;
                    res.status(201);
                    res.json(result);
                    return;

                });
            });
        });
    });


    userRoute.options(function(req, res) {
        res.writeHead(200);
        res.end();
    });

    //Start /users/:id endpoint

    var userIDRoute = router.route('/users/:id');

    userIDRoute.get(function(req, res) {
        var id = req.params.id;

        User.findById(id, function(error, user) {
            if (error) {
                var result = {};
                result.message = "Server Error: Error getting user";
                result.data = [];
                res.status(500);
                res.json(result);
                return;
            } else if (user == null) {
                var result = {};
                result.message = "Error: User not found";
                result.data = [];
                res.status(404);
                res.json(result);
            } else {
                var result = {};
                result.message = "Ok";
                result.data = user;
                res.status(200);
                res.json(result);
                return;
            }
        });
    });

    userIDRoute.put(function(req, res) {
        var id = req.params.id;

        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var soundEnvironmentIDArray = req.body.soundEnvironmentIDArray;

        if (username.length == 0 || email.length == 0 || password.length == 0 || soundEnvironmentIDArray.length == 0) {
            var result = {};
            result.message = "Error: Missing data";
            result.data = [];
            res.status(400);
            res.json(result);
            return;
        }


        User.findById(id, function(error, user) {
            if (error) {
                var result = {};
                result.message = "Server Error: Unable to retrieve target user";
                result.data = [];
                res.status(500);
                res.json(result);
                return;
            } else if (user == null) {
                var result = {};
                result.message = "Error: User not found";
                result.data = [];
                res.status(404);
                res.json(result);
                return;
            } else {
                user.username = username;
                user.email = email;
                user.password = password;
                user.soundEnvironmentIDArray = soundEnvironmentIDArray;

                user.save(function(error) {
                    if (error) {
                        var result = {};
                        result.message = "Error: Unable to save user";
                        result.data = [];
                        res.status(500);
                        res.json(result);
                        return;
                    } else {
                        var result = {};
                        result.message = "User updated";
                        result.data = user;
                        res.status(200);
                        res.json(result);
                        return;
                    }
                });
            }
        });
    });

    userIDRoute.delete(function(req, res) {
        var id = req.params.id;

        User.findById(id, function(error, user) {
            if (error) {
                var result = {};
                result.message = "Server Error: Unable to find user";
                result.data = [];
                res.status(500);
                res.json(result);
                return;
            }

            if (user == null) {
                var result = {};
                result.message = "Error: User not found";
                result.data = [];
                res.status(404);
                res.json(result);
                return;
            }

            user.remove(function(error) {
                if (error) {
                    var result = {};
                    result.message = "Server Error: Unable to remove user";
                    result.data = [];
                    res.status(500);
                    res.json(result);
                    return;
                } else {
                    var result = {};
                    result.message = "User deleted";
                    result.data = [];
                    res.status(200);
                    res.json(result);
                    return;
                }
            });
        });
    })

    var userAuthRoute = router.route('/userauth');

    userAuthRoute.post(function(req, res) {
        var username = req.body.username;

        User.findOne({ 'username': username }, function(error, user) {
            if (error) {
                console.log("Auth findOne error");
                throw error;
            }

            if (!user) {
                res.send({ success: false, msg: 'Authentication failed, user not found' });
            } else {
                //check if password matches
                var password = req.body.password;
                user.comparePassword(password, function(error, passMatch) {
                    if (passMatch && !error) {
                        // create token if user is found and password matches then create token
                        var token = jwt.encode(user, secrets.secret);
                        //return token
                        res.json({ success: true, msg: 'Authentication successful', token: 'JWT ' + token });
                    } else {
                        res.send({ success: false, msg: 'Authentication failed, password mismatch' });
                    }
                });
            }
        });
    });

    // userIDRoute.get(function(req, res) {
    //     var id = req.params.id;

    //     User.findById(id, function(error, user) {
    //         if (error) {
    //             var result = {};
    //             result.message = "Server Error: Error getting user";
    //             result.data = [];
    //             res.status(500);
    //             res.json(result);
    //             return;
    //         } else if (user == null) {
    //             var result = {};
    //             result.message = "Error: User not found";
    //             result.data = [];
    //             res.status(404);
    //             res.json(result);
    //         } else {
    //             var result = {};
    //             result.message = "Ok";
    //             result.data = user;
    //             res.status(200);
    //             res.json(result);
    //             return;
    //         }
    //     });
    // });


    return router;
}
