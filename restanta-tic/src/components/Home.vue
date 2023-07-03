<template>
  <div class="page-content">
    <h1>Lista Prescripțiilor</h1>
    <div class="prescriptions-container">
      <div class="prescription-card" v-for="prescription in prescriptions" :key="prescription.id">
        <h3 class="prescription-title">{{ prescription.createdAt }}</h3>
        <p class="prescription-time">{{ prescription.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      prescriptions: []
    };
  },
  mounted() {
    this.fetchPrescriptions();
  },
  methods: {
    fetchPrescriptions() {
      axios.get('http://localhost:3000/api/prescriptions/')
        .then(response => {
          this.prescriptions = response.data;
        })
        .catch(error => {
          console.error('A apărut o eroare:', error);
        });
    }
  }
};
</script>

<style>
.prescriptions-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.prescription-card {
  background-color: #f5f5f56b;
  border-radius: 4px;
  padding: 16px;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.prescription-title {
  font-size: 18px;
  margin-bottom: 8px;
  color: #000000;
}

.prescription-time {
  font-size: 14px;
  color: #000000;
}
</style>
