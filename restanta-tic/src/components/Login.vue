<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit" :disabled="isPending">
        <span v-if="isPending">Logging In...</span>
        <span v-else>Login</span>
      </button>
      <p class="error-message" v-if="error">{{ error }}</p>
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
const error = ref(null);
const isPending = ref(false);

const handleSubmit = async () => {
  error.value = null;
  isPending.value = true;
  try {
    const res = await axios.post("http://localhost:3000/api/users/login", {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("token", JSON.stringify(res.data.idToken));

    error.value = null;
    isPending.value = false;
  } catch (err) {
    console.log(err.message);
    error.value = "Incorrect login credentials";
    isPending.value = false;
  }

  if (!error.value) {
    router.push({ name: "prescriptions" });
  }
};
</script>

<style>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #000000
}

.form-group {
  margin-bottom: 15px;
  color: #000000
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
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
