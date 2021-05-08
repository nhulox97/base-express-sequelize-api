const jwt = require('jsonwebtoken');
const {
    badRequestResponse,
    notAuthorizedRequestResponse
} = require('../utils/responseHandler');

/**
 * This function check if a token was sent into request headers and also if
 * it is a valid token.
 * @param {Request} req
 * @param {Response} res
 * @param {any} next
 * @returns {void}
 */
module.exports = (req, res, next) => {
    // Gather the jwt token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // check if token was received
    if (token == null)
        return badRequestResponse(res, {
            msg: 'Token was not sent by the client'
        });

    // Verify if token is valid
    jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
        if (err) {
            console.log(`[jwt] ${err}`);
            return notAuthorizedRequestResponse(res, {
                msg: 'Token is not valid'
            });
        }
        req.user = payload;
        next();
    });
};
