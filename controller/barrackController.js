const Barrack = require('../Models/Barrack');
const User = require('../models/User');

class barrackController {
    static list(req, res, next) {
        Barrack.find()
            .then((barrack) => {
                res.status(200).json({
                    message: 'succes list barrack',
                    data: barrack
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
        
        if (resources.golds >= 30 && resources.foods >= 30){
            const updateResource = await User.findByIdAndUpdate(req._userId, {
                $set: {
                    'resource.golds': golds - 30,
                    'resource.foods': foods - 30
                }, 
            }, {
                new: true
            })
        
            const barrack = await Barrack.create({
                _barrackId: req._userId,
                name,
            });
                res.status(201).json({
                    message: 'succes to create barrack',
                    data: {
                        barrack: barrack,
                        newResource: updateResource.resource
                    }
                });
        }else if (resources.golds < 30 || resources.foods < 30)
                res.status(500).json({
                    message: 'insufficient resources'
                })
        else {
            next()
        }
            
    }

    static async get(req, res, next) {
        const user = await User.findById(req._userId);
        Barrack.findOne({
                _id: req.params.id
        })
            .then((barrack) => {
                res.status(200).json({
                    message: 'succes view barrack and resource',
                    data: {
                        barrack: barrack,
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
        Barrack.findOne({
                _id: req.params.id
            })
            .then((barrack) => {
                barrack.name = name;
                return barrack.save();
            })
            .then((barrack) => {
                res.status(200).json({
                    message: 'succes upadate barrack',
                    data: barrack
                })
            })
            .catch(next);
    }

    static delete(req, res, next) {
        Barrack.findOne({
                _id: req.params.id
            })
            .then((barrack) => {
                return barrack.remove();
            })
            .then((barrack) => {
                res.status(200).json({
                    message: 'succes delete barrack',
                    data: barrack
                })
            })
    }

    static collect(req, res, next) {
        const { id } = req._barrackId;
        let soldiersCollected;
        Barrack.findById(id).then((barrack) => {
            if (barrack) {
                soldiersCollected = Math.floor((Date.now() - barrack.lastCollected) / 60000);
                soldiersCollected = soldiersCollected > 10? 10 : soldiersCollected; 
                barrack.lastCollected = Date.now();
                return barrack.save();
            }
        }).then((barrack) => {
            return User.findById(req._barrackId);
        }).then((user) => {
            const resource = user.resource;
            resource.golds += soldiersCollected;
            return User.updateOne({ _id: req._barrackId }, { resource: resource });
        }).then((result) => {
            res.status(200).json({
                message: 'succes',
                message: `${soldierCollected} soldiers collected to your resource`,
            });
        }).catch(next);
    }
};

module.exports = barrackController;