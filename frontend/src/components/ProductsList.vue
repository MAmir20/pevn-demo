<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import axios from "axios";

// Define props
interface Product {
  id: number;
  name: string;
}

const props = defineProps<{ products: Product[] }>();

// Define emits for communicating with the parent
const emit = defineEmits(["productDeleted", "editProduct"]);

const deleteProduct = async (id: number) => {
  if (confirm("Are you sure you want to delete this product?")) {
    try {
      await axios.delete(`http://localhost:5000/Product/products/${id}`);
      console.log("Product deleted");

      // Emit an event to tell the parent to reload data
      emit("productDeleted");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }
};
</script>

<template>
  <div>
    <h2>All Products List</h2>

    <table v-if="products.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Product Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>
            <button type="button" @click="emit('editProduct', product)">Edit</button>
            <button type="button" @click="deleteProduct(product.id)">Delete</button>
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
