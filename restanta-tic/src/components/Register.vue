<template>
    <div class="register-container">
        <h2>Register</h2>
        <form @submit="handleSubmit">
            <div class="form-group">
                <label for="name">Display Name</label>
                <input type="text" id="name" v-model="displayName" required />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <div class="form-group">
                <button type="submit" :disabled="isPending">Register</button>
            </div>
            <div class="error" v-if="error">{{ error }}</div>
        </form>
    </div>
</template>
  
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const displayName = ref("");
const error = ref(null);
const isPending = ref(false);

const handleSubmit = async () => {
    error.value = null;
    isPending.value = true;
    try {
        const res = await axios.post("http://localhost:3000/api/users/register", {
            displayName: displayName.value,
            email: email.value,
            password: password.value,
        });

        if (!res) {
            throw new Error("Could not complete register");
        }
        error.value = null;
        isPending.value = false;
    } catch (err) {
        console.log(err.message);
        error.value = err.message;
        isPending.value = false;
    }

    if (!error.value) {
        router.push({ name: "Login" });
    }
};
</script>
  
<style scoped>
.register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: aquamarine;
}

h2 {
    text-align: center;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background-color: #3490dc;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>
  