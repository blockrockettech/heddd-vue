const {validateJwtToken} = require("./middlewares/jwtValdiator");

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
        const payload = {
            username: username,

            // You can include other non-private or sensitive data in the response payload like roles, names etc
            nickname: "Jimbob",
            role: 'CODE_MONKEY'
        };
        const token = jwt.sign(payload, SUPER_SECRET_KEY, {
            // set token expiry for 1 minutes
            expiresIn: '1min',
        });

        // return the JWT token for the future API calls
        return res.json({
            success: true,
            message: 'Authentication successful',
            // The token is a long signed string from the about username, using the SUPER_SECRET_KEY
            token: token
        });
    }

    return res.status(403).json({
        success: false,
        message: 'Incorrect username or password'
    });
});

// Try to get the user by decoding any token which is found
auth.get('/user', validateJwtToken, function (req, res) {

    const payload = {
        // You can include other non-private or sensitive data in the response payload like roles, names etc
        username: req.decoded.username,
        nickname: req.decoded.nickname,
        role: req.decoded.role
    };
    const token = jwt.sign(payload, SUPER_SECRET_KEY, {
        // set token expiry for 1 minutes
        expiresIn: '1min',
    });

    // return the JWT token for the future API calls
    return res.json({
        success: true,
        message: 'Authentication successful',
        // The token is a long signed string from the about username, using the SUPER_SECRET_KEY
        token: token
    });
});

module.exports = auth;
