const router = require('express').Router();
const barrackController = require('../controller/barrackController');
const barrackAuthorization = require('../middleware/barrackAuthorization');

router.get('/', barrackController.list);
router.post('/', barrackController.post);
router.get('/:id', barrackAuthorization, barrackController.get);
router.put('/:id', barrackAuthorization, barrackController.put);
router.delete('/:id', barrackAuthorization, barrackController.delete);

module.exports = router;