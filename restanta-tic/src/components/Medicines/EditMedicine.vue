<template>
    <div class="edit-medicines">
        <h2>Edit Medicines</h2>
        <form @submit="handleSubmit" v-if="medicine">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" v-model="title" />
            </div>
            <div class="form-group">
                <label for="family">Family</label>
                <input type="text" id="family" v-model="family" />
            </div>
            <div class="form-group">
                <button type="submit" :disabled="isPending">Save</button>
                <button type="button" @click="handleClose">Cancel</button>
            </div>
            <div class="error" v-if="error">{{ error }}</div>
        </form>
        <div class="loading" v-else-if="isPending">Loading...</div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { defineProps, toRefs, ref } from "vue";
import axios from "axios";

const props = defineProps({
    prescriptionId: String,
    medicineId: String,
});

const { prescriptionId, medicineId } = toRefs(props);

const getMedicineById = async () => {
    const res = await axios.get(
        `http://localhost:3000/api/prescriptions/${prescriptionId.value}/medicines/${medicineId.value}`
    );
    return res.data;
};

const medicine = await getMedicineById();

const title = ref(medicine.title);
const family = ref(medicine.family);

const error = ref(null);
const isPending = ref(false);

const handleSubmit = async () => {
    error.value = null;
    isPending.value = true;
    try {
        const token = localStorage.getItem("token").slice(1, -1);
        const res = await axios.put(
            `http://localhost:3000/api/prescriptions/${prescriptionId.value}/medicines/${medicineId.value}`,
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
        router.push({ name: "MedicinesGrid", params: { id: prescriptionId.value } });
    }
};

const router = useRouter();
const handleClose = () => {
    router.push({ name: "MedicinesGrid", params: { id: prescriptionId.value } });
};
</script>

<style>
.edit-medicines {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

h2 {
    text-align: center;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"] {
    width: 100%;
    padding: 5px;
}

button {
    padding: 8px 12px;
    margin-right: 10px;
}

.error {
    color: red;
}

.loading {
    text-align: center;
}
</style>