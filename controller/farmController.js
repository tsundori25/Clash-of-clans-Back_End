const Farm = require('../Models/Farm');
const User = require('../models/User');

class farmController {
    static list(req, res, next) {
        Farm.find()
            .then((farm) => {
                res.status(200).json({
                    message: 'succes list farm',
                    data: farm
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
        
        if (resources.golds >= 10 && resources.foods >= 30){
            const updateResource = await User.findByIdAndUpdate(req._userId, {
                $set: {
                    'resource.golds': golds - 10,
                    'resource.foods': foods - 30
                }, 
            }, {
                new: true
            })
        
            const farm = await Farm.create({
                _farmId: req._userId,
                name,
            });
                res.status(201).json({
                    message: 'succes to create farm',
                    data: {
                        farm: farm,
                        newResource: updateResource.resource
                    }
                });
        }else if (resources.golds < 10 || resources.foods < 30)
                res.status(500).json({
                    message: 'insufficient resources'
                })
        else {
            next()
        }
            
    }

    static async get(req, res, next) {
        const user = await User.findById(req._userId);
        Farm.findOne({
                _id: req.params.id
        })
            .then((farm) => {
                res.status(200).json({
                    message: 'succes view and resource farm',
                    data: {
                        farm: farm,
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
        Farm.findOne({
                _id: req.params.id
            })
            .then((farm) => {
                farm.name = name;
                return farm.save();
            })
            .then((farm) => {
                res.status(200).json({
                    message: 'succes upadate farm',
                    data: farm
                })
            })
            .catch(next);
    }

    static delete(req, res, next) {
        Farm.findOne({
                _id: req.params.id
            })
            .then((farm) => {
                return farm.remove();
            })
            .then((farm) => {
                res.status(200).json({
                    message: 'succes delete farm',
                    data: farm
                })
            })
    }

    static collect(req, res, next) {
        const { id } = req._farmId;
        let foodsCollected;
        Farm.findById(id).then((farm) => {
            if (farm) {
                foodsCollected = Math.floor((Date.now() - farm.lastCollected) / 60000);
                foodsCollected = foodsCollected > 20? 20 : foodsCollected; 
                farm.lastCollected = Date.now();
                return farm.save();
            }
        }).then((farm) => {
            return User.findById(req._farmId);
        }).then((user) => {
            const resource = user.resource;
            resource.foods += foodssCollected;
            return User.updateOne({ _id: req._farmId }, { resource: resource });
        }).then((result) => {
            res.status(200).json({
                message: 'succes',
                message: `${foodsCollected} foods collected to your resource`,
            });
        }).catch(next);
    }
}

module.exports = farmController;