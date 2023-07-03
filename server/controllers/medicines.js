const PrescriptionsDB = require("../models").prescriptions;

const controller = {
    getAllMedicines: async (req, res) => {
        try {
            const { prescriptionId } = req.params;
            const medicines = PrescriptionsDB.doc(`${prescriptionId}`).collection("medicines");
            medicines.get().then((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log(data);
                return res.status(200).json(data);
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getMedicineById: async (req, res) => {
        const { prescriptionId, medicineId } = req.params;
        const medicine = PrescriptionsDB.doc(`${prescriptionId}`)
            .collection("medicines")
            .doc(`${medicineId}`);
        medicine
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    return res.status(404).json({ message: "Medicine not found!" });
                }
                const data = {
                    id: doc.id,
                    ...doc.data(),
                };
                console.log("Document data:", data);
                return res.status(200).json(data);
            })
            .catch((err) => {
                return res.status(500).json({ message: err.message });
            });
    },
    addMedicine: async (req, res) => {
        const { title, family } = req.body;
        const { prescriptionId } = req.params;
        const medicines = PrescriptionsDB.doc(`${prescriptionId}`).collection("medicines");
        medicines
            .add({
                title,
                family,
            })
            .then((ref) => {
                console.log("Added doc with ID: ", ref.id);
                return res
                    .status(200)
                    .json({ message: `Added doc with ID: ${ref.id}` });
            })
            .catch((err) => {
                return res.status(500).json({ message: err.message });
            });
    },
    updateMedicine: async (req, res) => {
        const { ...updatedFiels } = req.body;
        const { prescriptionId, medicineId } = req.params;
        const medicine = PrescriptionsDB.doc(`${prescriptionId}`)
            .collection("medicines")
            .doc(`${medicineId}`);
        medicine
            .update({
                ...updatedFiels,
            })
            .then(() => {
                return res.status(200).json({ message: `Medicine updated successfully!` });
            })
            .catch((err) => {
                return res.status(500).json({ message: err.message });
            });
    },
    deleteMedicine: async (req, res) => {
        const { prescriptionId, medicineId } = req.params;
        const medicine = PrescriptionsDB.doc(`${prescriptionId}`)
            .collection("medicines")
            .doc(`${medicineId}`);
        medicine
            .delete()
            .then(() => {
                return res.status(200).json({ message: `Medicine deleted successfully!` });
            })
            .catch((err) => {
                return res.status(500).json({ message: err.message });
            });
    },
};

module.exports = controller;