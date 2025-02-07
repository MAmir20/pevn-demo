<script setup>
import { defineProps } from "vue";
import axios from "axios";
const props = defineProps({
  products: Array,
  query: {
    type: String,
    default: "",
  },
});

const deleteProduct = async (id) => {
  if (confirm("Are you sure you want to delete this product?")) {
    try {
      const response = await axios.delete(`http://localhost:5000/products/${id}`);
        console.log("Product deleted:", response.data);
        const response2 = await axios.get("http://localhost:5000/getAll");
        products.value = response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }
};
</script>

<template>
  <div>
    <!-- Search Input -->
    <h2 v-if="props.query.length > 0">
      Search results for "{{ props.query }}"
    </h2>
    <h2 v-else>All products list</h2>
    <table v-if="props.products.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Product Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in props.products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>
            <button type="button">Edit</button> -
            <button type="button" @click="deleteProduct(product.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
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
