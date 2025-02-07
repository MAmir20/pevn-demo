<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";

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
    <h2 v-if="query.length > 0">Search results for "{{ query }}"</h2>
    <h2 v-else>All products list</h2>
    <table v-if="results.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Product Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in results" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}
.product-form {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
input {
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
</style>
