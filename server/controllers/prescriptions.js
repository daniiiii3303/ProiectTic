const PrescriptionsDB = require("../models").prescriptions;

const controller = {
    getAllPrescriptions: async (req, res) => {
        try {
            PrescriptionsDB.get().then((snapshot) => {
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
    getPrescriptionById: async (req, res) => {
        const { id } = req.params;
        const prescription = PrescriptionsDB.doc(id);

        prescription
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    return res.status(404).json({ message: "Prescription not found!" });
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
    addPrescription: async (req, res) => {
        const { title, description } = req.body;
        PrescriptionsDB.add({
            title,
            description
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
    updatePrescription: async (req, res) => {
        const { ...updatedFiels } = req.body;
        const { id } = req.params;
        const prescription = PrescriptionsDB.doc(`${id}`);
        prescription
            .update({
                ...updatedFiels,
            })
            .then(() => {
                return res
                    .status(200)
                    .json({ message: `Prescription updated successfully!` });
            })
            .catch((err) => {
                return res.status(500).json({ message: err.message });
            });
    },
    deletePrescription: async (req, res) => {
        const { id } = req.params;
        const company = PrescriptionsDB.doc(`${id}`);
        company
            .delete()
            .then(() => {
                return res
                    .status(200)
                    .json({ message: `Prescription deleted successfully!` });
            })
            .catch((err) => {
                return res.status(500).json({ message: err.message });
            });
    },
};

module.exports = controller;