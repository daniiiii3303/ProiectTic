const express = require("express");
const router = express.Router();
const prescriptionsRouter = require("./prescriptions");
const medicinesRouter = require("./medicines");
const usersRouter = require("./users");

router.use("/prescriptions", prescriptionsRouter);
router.use("/prescriptions", medicinesRouter);
router.use("/users", usersRouter);

module.exports = router;