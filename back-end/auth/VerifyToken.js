var jwt = require('jsonwebtoken');
var config = require('../config.js');

function verifyToken(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        // If everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}

function verifyCaptainToken(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        // If everything good, save to request for use in other routes
        req.userId = decoded.id;
        //const isCaptain = 'SELECT '
        next();
    });
}

module.exports = verifyToken;