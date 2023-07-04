<template>
    <div class="prescriptions-grid">
        <button class="add-button" @click="handleAdd">Add Prescription</button>
        <div v-for="prescription in state.prescriptions" :key="prescription.id" class="prescription-card">
            <h3 class="prescription-title">{{ prescription.title }}</h3>
            <p class="prescription-description">{{ prescription.description }}</p>
            <div class="prescription-actions">
                <button class="edit-button" @click="handleEdit(prescription.id)">Edit</button>
                <button class="view-button" @click="handleViewMedicines(prescription.id)">View</button>
                <button class="delete-button" @click="handleDelete(prescription.id)">Delete</button>
            </div>
        </div>

    </div>
</template>
  
<script>
import axios from "axios";
import { reactive } from "vue";
import { useRouter } from "vue-router";

export default {
    setup() {
        const router = useRouter();
        const state = reactive({
            prescriptions: [],
        });

        const handleAdd = () => {
            router.push({ name: "AddPrescription" });
        };

        const handleEdit = (prescriptionId) => {
            router.push({ name: "EditPrescription", params: { id: prescriptionId } });
        };

        const handleViewMedicines = (prescriptionId) => {
            router.push({ name: "MedicinesGrid", params: { id: prescriptionId } });
        };

        const getPrescriptions = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/prescriptions/");
                state.prescriptions = res.data;
            } catch (error) {
                console.error(error);
            }
        };

        const handleDelete = async (prescriptionId) => {
            try {
                const token = localStorage.getItem("token").slice(1, -1);
                const res = await axios.delete(`http://localhost:3000/api/prescriptions/${prescriptionId}`, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data.message);
                await getPrescriptions();
            } catch (error) {
                console.error(error);
            }
        };

        // Call the function to fetch prescriptions on component mount
        getPrescriptions();

        return {
            state,
            handleAdd,
            handleEdit,
            handleViewMedicines,
            handleDelete,
        };
    },
};
</script>
  
<style scoped>
.prescriptions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
    background-position: center;
}

.prescription-card {
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
}

.prescription-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.prescription-description {
    font-size: 14px;
    line-height: 1.4;
    color: black;
}

.prescription-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}

.delete-button {
    background-color: #e74c3c;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
}

.view-button {
    background-color: #3ce753;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
}

.add-button {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
}
</style>
  