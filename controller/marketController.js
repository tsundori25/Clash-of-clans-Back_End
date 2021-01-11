const Market = require('../Models/Market');
const User = require('../models/User');

class marketController {
    static list(req, res, next) {
        Market.find()
            .then((market) => {
                res.status(200).json({
                    message: 'succes view list all market',
                    data: market
                })
            })
    }

    static async post(req, res, next) {
        const user = await User.findById(req._userId);
        const {
            golds,
            foods
        } = user.resource
        const resources = user.resource
        const {
            name
        } = req.body

        if (resources.golds >= 30 && resources.foods >= 10) {
            const updateResource = await User.findByIdAndUpdate(req._userId, {
                $set: {
                    'resource.golds': golds - 30,
                    'resource.foods': foods - 10
                }
            }, {
                new: true
            })
            const market = await Market.create({
                _marketId: req._userId,
                name,
            })
            res.status(201).json({
                message: 'succes create market',
                data: {
                    market: market,
                    newResource: updateResource.resource
                }
            })
        }else if (resources.golds < 30 || resources.foods < 10)
            res.status(500).json({
                message: 'insufficient resources'
            })
        else {
            next()
        }
    }

    static async get(req, res, next) {
        const user = await User.findById(req._userId);
        Market.findOne({
            _id: req.params.id
        })
            .then((market) => {
                res.status(200).json({
                    message: 'succes view market and resource',
                    data: {
                        market: market,
                        updateResource: user.resource
                    }
                })
            })
            .catch(next);
    }

    static put(req, res, next) {
        const {
            name,
        } = req.body;
        Market.findOne({
                _id: req.params.id
            })
            .then((market) => {
                market.name = name;
                return market.save();
            })
            .then((market) => {
                res.status(200).json({
                    message: 'succes upadate market',
                    data: market
                })
            })
            .catch(next); 
    }

    static delete(req, res, next) {
        Market.findOne({
                _id: req.params.id
            })
            .then((market) => {
                return market.remove();
            })
            .then((market) => {
                res.status(200).json({
                    message: 'succes delete market',
                    data: market
                })
            })
    }

    static collect(req, res, next) {
        const { id } = req._marketId;
        let goldsCollected;
        Market.findById(id).then((market) => {
            if (market) {
                goldsCollected = Math.floor((Date.now() - market.lastCollected) / 60000);
                goldsCollected = goldsCollected > 10? 10 : goldsCollected; 
                market.lastCollected = Date.now();
                return market.save();
            }
        }).then((barrack) => {
            return User.findById(req._marketId);
        }).then((user) => {
            const resource = user.resource;
            resource.golds += goldsCollected;
            return User.updateOne({ _id: req._marketId }, { resource: resource });
        }).then((result) => {
            res.status(200).json({
                message: 'succes',
                message: `${goldsCollected} golds collected to your resource`,
            });
        }).catch(next);
    }

};


module.exports = marketController;