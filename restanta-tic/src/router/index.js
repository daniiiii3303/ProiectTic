import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import EditPrescription from "../components/Prescriptions/EditPrescription.vue";
import Register from "../components/Register.vue";
import Login from '../components/Login.vue';
import PrescriptionsView from "../views/PrescriptionsView.vue";
import AddPrescription from "../components/Prescriptions/AddPrescription.vue";
import MedicinesGrid from "../components/Medicines/MedicinesGrid.vue";
import AddMedicine from "../components/Medicines/AddMedicine.vue";
import EditMedicine from "../components/Medicines/EditMedicine.vue";


import axios from "axios"

const getCurrentUser = async () => {
  const res = await axios.get("http://localhost:3000/api/users/currentUser");
  return res.data;
};

const requireAuth = async (to, from, next) => {
  const user = await getCurrentUser();
  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "prescriptions",
    component: PrescriptionsView,
    beforeEnter: requireAuth,
  },
  {
    path: "/prescriptions/:id",
    name: "EditPrescription",
    component: EditPrescription,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/prescriptions/addPrescription",
    name: "AddPrescription",
    component: AddPrescription,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/prescriptions/:id/medicines",
    name: "MedicinesGrid",
    component: MedicinesGrid,
    props: true,
  },
  {
    path: "/prescriptions/:prescriptionId/medicines/addMedicine",
    name: "AddMedicine",
    component: AddMedicine,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/prescriptions/:prescriptionId/medicines/:medicineId",
    name: "EditMedicine",
    component: EditMedicine,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: '/login',
    name: "Login",
    component: Login
  },
  //  { path: '/addPrescriptions', component: AddPrescriptions },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});



export default router
