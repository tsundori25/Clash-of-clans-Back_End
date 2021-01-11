const Farm = require("../Models/Farm");

module.exports = (req, res, next) => {
    Farm.findOne({
            _id: req.params.id
        })
        .then((farm) => {
            if (farm) {
                if (farm._id.toString() === req.params.id) next();
                else throw {
                    name: "FORBIDDEN"
                };
            } else throw {
                name: "NOT_FOUND"
            };
        })
        .catch(next);
};