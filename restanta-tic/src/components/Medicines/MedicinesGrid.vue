<template>
    <div class="medicines-grid">
        <h2>Medicines</h2>
        <div class="grid">
            <div v-for="medicine in state.medicines" :key="medicine.id" class="medicine-card">
                <h3>{{ medicine.title }}</h3>
                <p>Family: {{ medicine.family }}</p>
                <div class="button-group">
                    <button @click="handleEdit(medicine.id)" class="edit-button">Edit</button>
                    <button @click="handleDelete(medicine.id)" class="delete-button">Delete</button>
                </div>
            </div>
        </div>
        <div class="add-button-container">
            <button @click="handleAdd" class="add-button">Add Medicine</button>
        </div>
    </div>
</template>
  
<script setup>
import axios from "axios";
import { defineProps, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    id: String,
});
const { id } = toRefs(props);

const router = useRouter();

const getPrescriptionsById = async () => {
    const res = await axios.get(`http://localhost:3000/api/prescriptions/${id.value}`);
    return res.data;
};

const prescription = await getPrescriptionsById();

const handleAdd = () => {
    router.push({ name: "AddMedicine", params: { prescriptionId: id.value } });
};

const handleEdit = (medicineId) => {
    router.push({ name: "EditMedicine", params: { prescriptionId: id.value, medicineId } });
};

const getMedicines = async () => {
    const res = await axios.get(`http://localhost:3000/api/prescriptions/${id.value}/medicines`);
    return res.data;
};

const medicines = await getMedicines();

const state = reactive({
    medicines: medicines,
});

const handleDelete = async (medicineId) => {
    const token = localStorage.getItem("token").slice(1, -1);
    const res = await axios.delete(
        `http://localhost:3000/api/prescriptions/${id.value}/medicines/${medicineId}`,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    console.log(res.data.message);
    state.medicines = await getMedicines();
};

const handleClose = () => {
    router.push({ name: "prescriptions" });
};
</script>
  
<style scoped>
.medicines-grid {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.medicines-grid h2 {
    text-align: center;
    margin-bottom: 20px;
}

.medicines-grid .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.medicines-grid .medicine-card {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.medicines-grid .medicine-card h3 {
    margin-top: 0;
    color: black;
}

.medicines-grid .medicine-card p {
    margin-bottom: 0;
    color: black;
}

.medicines-grid .button-group {
    display: flex;
}
</style >