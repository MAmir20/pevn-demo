<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';

const query = ref('');
const results = ref([]);

const search = async () => {
  if (query.value.length >= 1) {
    try {
      const response = await axios.get(`http://localhost:5000/search?q=${query.value}`);
      results.value = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  } else {
    results.value = [];
  }
};

// Automatically call search when `query` changes
watch(query, search);
</script>

<template>
  <div>
    <input v-model="query" type="text" placeholder="Search..." />
    <ul>
      <li v-for="item in results" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>
