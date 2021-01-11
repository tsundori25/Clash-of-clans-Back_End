const Barrack = require("../Models/Barrack");

module.exports = (req, res, next) => {
    Barrack.findOne({
            _id: req.params.id
        })
        .then((barrack) => {
            if (barrack) {
                if (barrack._userId.toString() === req.id) next();
                else throw {
                    name: "FORBIDDEN"
                };
            } else throw {
                name: "NOT_FOUND"
            };
        })
        .catch(next);
};