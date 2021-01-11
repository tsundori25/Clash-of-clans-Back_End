const Market = require("../Models/Market");

module.exports = (req, res, next) => {
    Market.findOne({
            _id: req.params.id
        })
        .then((market) => {
            if (market) {
                if (market._id.toString() === req.params.id) next();
                else throw {
                    name: "FORBIDDEN"
                };
            } else throw {
                name: "NOT_FOUND"
            };
        })
        .catch(next);
};