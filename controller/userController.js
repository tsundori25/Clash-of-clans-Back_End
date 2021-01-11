const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
    static register(req, res, next) {
        const {
            email,
            password,
            townhall
        } = req.body;
        const user = new User({
            email,
            password,
            townhall,
            resource: {
                golds: '100',
                foods: '100',
                soldier: '0'
            }
        });
        user
            .save()
            .then((user) => {
                res.status(201).json({
                    message: 'succes register',
                    data: {
                        _id: user._id,
                        email: user.email,
                        townhall: user.townhall,
                        resource: user.resource
                    }
                });
            })
            .catch(next);
    }

    static login(req, res, next) {
        const {
            email,
            password
        } = req.body;
        User.findOne({
                email
            })
            .then((user) => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    const acces_token = jwt.sign({
                        _id: user._id
                    }, 'ACCES_TOKEN');
                    res.status(200).json({
                        message: 'succes login',
                        acces_token
                    });
                } else throw {
                    name: 'LOGIN_FAIL'
                };
            })
            .catch(next);
    }

    static get(req, res, next) {
        User.findOne(req._id)
            .then((user) => {
                if (user) {
                    res.status(200).json({ 
                        success: true, 
                        data: user.resource
                    });
                } 
            })
            .catch(next);
    }

}

module.exports = UserController;