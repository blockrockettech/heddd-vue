const _ = require('lodash');
const jwt = require('jsonwebtoken');

const {SUPER_SECRET_KEY} = require("./middlewares/jwtValdiator");

const auth = require('express').Router({mergeParams: true});

auth.post('/login', function (req, res) {
    console.log(req.body);

    if (!req.body.username || !req.body.password) {
        return res
            .send(400)
            .json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });
    }

    const {username, password} = req.body;

    if (username === 'jimbob' && password === 'password') {

        // token is generated as a long string
        const token = jwt.sign({username: username},
            SUPER_SECRET_KEY,
            {
                expiresIn: '24h' // expires in 24 hours
            }
        );

        // return the JWT token for the future API calls
        return res.json({
            success: true,
            message: 'Authentication successful',
            token: token
        });
    }

    return res.send(403).json({
        success: false,
        message: 'Incorrect username or password'
    });
});

module.exports = auth;
