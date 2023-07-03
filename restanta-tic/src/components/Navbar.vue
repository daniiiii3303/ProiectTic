<template>
  <nav class="navbar">
    <div class="navbar-title">Medical prescriptions</div>
    <ul class="navbar-nav">
      <li v-for="item in navigation" :key="item.name" class="nav-item">
        <router-link :to="item.href" class="nav-link">{{ item.name }}</router-link>
      </li>
    </ul>
    <div class="navbar-auth">
      <template v-if="state.isLoggedIn">
        <!-- <button class="navbar-button" @click="handlePrescriptions">Your Prescriptions</button> -->
        <button class="navbar-button" @click="handleLogout">Logout</button>
      </template>
      <template v-else>
        <button class="navbar-button" @click="handleRegister">Inregistrare</button>
        <button class="navbar-button" @click="handleLogin">Autentificare</button>
      </template>
    </div>
  </nav>
</template>


<script setup>

import { useRouter } from "vue-router";
import axios from "axios";
import { reactive } from "vue";
// import { ref } from "vue";
const getCurrentUser = async () => {
  const res = await axios.get("http://localhost:3000/api/users/currentUser");
  return res.data;
};
const logout = async () => {
  const res = await axios.post("http://localhost:3000/api/users/logout");
  return res;
};
let user = await getCurrentUser();
const state = reactive({ isLoggedIn: !!user });
const router = useRouter();
let curVal = localStorage.getItem("token");
setInterval(async function () {
  const newVal = localStorage.getItem("token");
  if (newVal !== curVal) {
    curVal = newVal;
    user = await getCurrentUser();
    state.isLoggedIn = !!user;
  }
}, 500);
const handleLogout = async () => {
  const res = await logout();
  console.log(res);
  localStorage.removeItem("token");
  router.push({ name: "Login" });
};
const handleRegister = () => {
  router.push({ name: "Register" });
};
const handleLogin = () => {
  router.push({ name: "Login" });
};
const navigation = [{ name: "prescriptions", href: "/" }];
</script>


<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #9aece1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-title {
  font-weight: bold;
  font-size: 1.5rem;
  color: rgb(0, 0, 0);
}

s.navbar-nav {
  list-style-type: none;
  display: flex;
  gap: 1rem;
}

.nav-item {
  margin: 0;
}

.nav-link {
  color: #333;
  text-decoration: none;
  padding: 0.5rem;
  border-bottom: 2px solid transparent;
}

.nav-link:hover {
  border-bottom-color: #333;
}

.navbar-auth {
  display: flex;
  gap: 1rem;
}

.navbar-greeting {
  font-weight: bold;
}

.navbar-button {
  padding: 0.5rem 1rem;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.navbar-button:hover {
  background-color: #555;
}
</style>