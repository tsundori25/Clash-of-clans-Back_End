const router = require('express').Router();
const marketController = require('../controller/marketController');
const marketAuthorization = require('../middleware/marketAuthorization');

router.get('/', marketController.list);
router.post('/', marketController.post);
router.get('/:id', marketAuthorization, marketController.get);
router.put('/:id', marketAuthorization, marketController.put);
router.delete('/:id', marketAuthorization, marketController.delete);
router.get('/:id/collect', marketAuthorization, marketController.collect);

module.exports = router;