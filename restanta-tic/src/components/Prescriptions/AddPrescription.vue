<template>
    <div class="add-prescription">
        <h2>Add Prescription</h2>
        <form @submit="handleSubmit" class="prescription-form">
            <div class="form-group">
                <label for="title">Title:</label>
                <input id="title" type="text" v-model="title" required />
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description" v-model="description" required></textarea>
            </div>
            <div class="form-actions">
                <button type="submit" :disabled="isPending">Add Prescription</button>
                <button type="button" @click="handleClose">Cancel</button>
            </div>
            <p class="error" v-if="error">{{ error }}</p>
        </form>
    </div>
</template>
  
<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";

const title = ref("");
const description = ref("");
const error = ref(null);
const isPending = ref(false);

const router = useRouter();

const handleSubmit = async () => {
    error.value = null;
    isPending.value = true;
    try {
        const token = localStorage.getItem("token").slice(1, -1);
        const res = await axios.post(
            "http://localhost:3000/api/prescriptions",
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
            throw new Error("Could not complete add");
        }
        error.value = null;
        isPending.value = false;
        router.push({ name: "prescriptions" }); // Redirecționare către componenta "prescriptions.vue"
    } catch (err) {
        console.log(err.message);
        error.value = err.message;
        isPending.value = false;
    }
};

const handleClose = () => {
    router.push({ name: "prescriptions" });
};
</script>
  
<style scoped>
.add-prescription {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

.add-prescription h2 {
    text-align: center;
    margin-bottom: 20px;
}

.add-prescription .prescription-form .form-group {
    margin-bottom: 20px;
}

.add-prescription .prescription-form label {
    display: block;
    font-weight: bold;
}

.add-prescription .prescription-form input[type="text"],
.add-prescription .prescription-form textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.add-prescription .prescription-form .form-actions {
    text-align: center;
    margin-top: 20px;
}

.add-prescription .prescription-form .form-actions button {
    margin-right: 10px;
}

.add-prescription .error {
    color: red;
    margin-top: 10px;
    text-align: center;
}
</style>
  