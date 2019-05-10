const jwt = require('jsonwebtoken');

// FIXME this obviously isn't very safe
const SUPER_SECRET_KEY = "MySuperSecretAuthSecretSauce";

const validateJwtToken = (req, res, next) => {

    // Get any found auth token (express headers are always lowercase)
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    // Remove Bearer from string
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {

        // Validate the JWT signed token against the super secret key

        jwt.verify(token, SUPER_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token invalid, please try again'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Token not found on request'
        });
    }
};

module.exports = {
    SUPER_SECRET_KEY,
    validateJwtToken
};
