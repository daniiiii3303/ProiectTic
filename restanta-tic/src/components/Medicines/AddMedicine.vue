<template>
    <div class="add-medicine-container">
        <h2 class="add-medicine-title">Add Medicine</h2>
        <form class="add-medicine-form" @submit="handleSubmit">
            <div class="form-group">
                <label for="title" class="form-label">Title</label>
                <input type="text" id="title" class="form-input" v-model="title" required>
            </div>
            <div class="form-group">
                <label for="family" class="form-label">Family</label>
                <input type="text" id="family" class="form-input" v-model="family" required>
            </div>
            <button type="submit" class="submit-button" :disabled="isPending">Add</button>
            <p v-if="error" class="error-message">{{ error }}</p>
        </form>
        <button class="close-button" @click="handleClose">Close</button>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { defineProps, toRefs, ref } from "vue";
import axios from "axios";

const props = defineProps({
    prescriptionId: String,
});

const { prescriptionId } = toRefs(props);

const title = ref("");
const family = ref("");

const error = ref(null);
const isPending = ref(false);

const handleSubmit = async () => {
    error.value = null;
    isPending.value = true;
    try {
        const token = localStorage.getItem("token").slice(1, -1);
        const res = await axios.post(
            `http://localhost:3000/api/prescriptions/${prescriptionId.value}/medicines`,
            {
                title: title.value,
                family: family.value,
            },
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!res) {
            throw new Error("Could not complete add");
        }
        error.value = null;
        isPending.value = false;
    } catch (err) {
        console.log(err.message);
        error.value = err.message;
        isPending.value = false;
    }

    if (!error.value) {
        router.push({ name: "MedicinesGrid", params: { id: prescriptionId.value } });
    }
};

const router = useRouter();
const handleClose = () => {
    router.push({ name: "MedicinesGrid", params: { id: prescriptionId.value } });
};
</script>

<style scoped>
.add-medicine-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

.add-medicine-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.add-medicine-form {
    display: grid;
    gap: 10px;
}

.form-group {
    display: grid;
    gap: 5px;
}

.form-label {
    font-weight: bold;
}

.form-input {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.submit-button {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.error-message {
    color: red;
    margin-top: 10px;
}

.close-button {
    background-color: #ccc;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
}
</style>