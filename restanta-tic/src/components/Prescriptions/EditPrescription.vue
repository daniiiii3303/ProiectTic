<template>
    <div class="edit-prescription">
        <h2>Edit Prescription</h2>
        <form @submit="handleSubmit" class="prescription-form">
            <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="title" required>
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description" v-model="description" required></textarea>
            </div>
            <div class="form-group">
                <button type="submit" :disabled="isPending">Save Changes</button>
                <button type="button" @click="handleClose">Cancel</button>
            </div>
            <p v-if="error" class="error-message">{{ error }}</p>
        </form>
    </div>
</template>
  
<script setup>
import { useRouter } from "vue-router";

import { defineProps, toRefs, ref } from "vue";
import axios from "axios";

const props = defineProps({
    id: String,
});

const { id } = toRefs(props);

const getPrescriptionById = async () => {
    const res = await axios.get(
        `http://localhost:3000/api/prescriptions/${id.value}`
    );
    return res.data;
};

const prescription = await getPrescriptionById();

const title = ref(prescription.title);
const description = ref(prescription.description);

const error = ref(null);
const isPending = ref(false);

const handleSubmit = async () => {
    error.value = null;
    isPending.value = true;
    try {
        const token = localStorage.getItem("token").slice(1, -1);
        const res = await axios.put(
            `http://localhost:3000/api/prescriptions/${id.value}`,
            {
                title: title.value,
                description: description.value,
            },
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!res) {
            throw new Error("Could not complete edit");
        }
        error.value = null;
        isPending.value = false;
    } catch (err) {
        console.log(err.message);
        error.value = err.message;
        isPending.value = false;
    }

    if (!error.value) {
        router.push({ name: "prescriptions" });
    }
};

const router = useRouter();
const handleClose = () => {
    router.push({ name: "prescriptions" });
};
</script>
  
<style scoped>
.edit-prescription {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

h2 {
    text-align: center;
}

.prescription-form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 20px;
}

label {
    font-weight: bold;
}

input[type="text"],
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.error-message {
    color: red;
    margin-top: 10px;
}
</style>
  