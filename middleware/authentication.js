const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const {
        acces_token
    } = req.headers;
    if (acces_token) {
        jwt.verify(acces_token, 'ACCES_TOKEN', (error, decoded) => {
            if (error) next({
                name: 'INVALID TOKEN'
            });
            else {
                req._userId = decoded._id;
                next();
            }
        });
    } else next({
        name: 'MISSING_TOKEN'
    });
};