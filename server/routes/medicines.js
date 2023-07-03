const express = require("express");
const router = express.Router();
const medicinesController = require("../controllers").medicines;
const middleware = require("../middleware/index");

router.get("/:prescriptionId/medicines", medicinesController.getAllMedicines);
router.get("/:prescriptionId/medicines/:medicineId", medicinesController.getMedicineById);
router.post("/:prescriptionId/medicines",
    middleware.decodeToken,
    medicinesController.addMedicine
);
router.put(
    "/:prescriptionId/medicines/:medicineId",
    middleware.decodeToken,
    medicinesController.updateMedicine
);
router.delete(
    "/:prescriptionId/medicines/:medicineId",
    middleware.decodeToken,
    medicinesController.deleteMedicine
);

module.exports = router;