const router = require('express').Router();
const userController = require('../controller/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/resource', userController.get);

module.exports = router;