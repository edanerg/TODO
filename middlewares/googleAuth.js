const {OAuth2Client} = require('google-auth-library');
const config = require('../config');
const clientId = config.clientId;
const client = new OAuth2Client(clientId);

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (token) {
        client.verifyIdToken({
            idToken: token,
            audience: clientId
        }).then(ticket => {
            req.googleUser = ticket.getPayload();
            next();
        }).catch(err => {
            console.log(err);
            req.googleUser = {sub: ''};
            next();
        })
    } else {
        req.googleUser = {sub: ''};
        next();
    }
}

module.exports = auth;