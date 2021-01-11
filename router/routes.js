const router = require("express").Router();
const authentication = require("../middleware/authentication");
const userRouter = require("./user");
const barrackRouter = require("./barrack");
const farmRouter = require("./farm");
const marketRouter = require("./market");

const errorHandler = require("../middleware/errorHandler");

router.use("/user", userRouter);


router.use(authentication);

router.use("/market", marketRouter);
router.use("/barrack", barrackRouter);
router.use("/farm", farmRouter);


router.use(errorHandler);

module.exports = router;