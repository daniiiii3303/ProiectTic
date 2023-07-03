const express = require("express");
const router = express.Router();
const prescriptionsController = require("../controllers").prescriptions;
const middleware = require("../middleware/index");

router.get("/", prescriptionsController.getAllPrescriptions);
router.get("/:id", prescriptionsController.getPrescriptionById);
router.post("/", middleware.decodeToken, prescriptionsController.addPrescription);
router.put("/:id", middleware.decodeToken, prescriptionsController.updatePrescription);
router.delete(
    "/:id",
    middleware.decodeToken,
    prescriptionsController.deletePrescription
);

module.exports = router;