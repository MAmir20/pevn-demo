<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import ProductsList from "./ProductsList.vue";

const query = ref("");
const results = ref([]); // Holds search results
const products = ref([]); // Holds the full product list

// Fetch all products for the table
const getAll = async () => {
  try {
    const response = await axios.get("http://localhost:5000/getAll");
    products.value = response.data;
    results.value = response.data; // Initialize search results with full list
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Search for products based on query
const search = async () => {
  if (query.value.length > 0) {
    try {
      const response = await axios.get(
        `http://localhost:5000/search?q=${query.value}`
      );
      results.value = response.data;
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  } else {
    results.value = products.value; // Reset to full list if query is empty
  }
};

// Load all products on mount
onMounted(getAll);

// Automatically call search when `query` changes
watch(query, search);
</script>

<template>
  <div>
    <!-- Search Input -->
    <input v-model="query" type="text" placeholder="Search..." />
    <ProductsList :products="results" :query="query" />
  </div>
</template>

<style scoped>

input {
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
