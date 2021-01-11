const router = require('express').Router();
const farmController = require('../controller/farmController');
const farmAuthorization = require('../middleware/farmAuthorization');

router.get('/', farmController.list);
router.post('/', farmController.post);
router.get('/:id', farmAuthorization, farmController.get);
router.put('/:id', farmAuthorization, farmController.put);
router.delete('/:id', farmAuthorization, farmController.delete);

module.exports = router;