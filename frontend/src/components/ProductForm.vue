<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import ProductsList from "./ProductsList.vue";

interface Product {
  id: number;
  name: string;
}

const products = ref<Product[]>([]); // Holds the product list
const editingProduct = ref<Product | null>(null); // Stores the product being edited
const updatedName = ref(""); // Stores the updated name

// Fetch all products
const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/Product/getAll");
    products.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Add a new product
const newProduct = ref({ name: "" });

const addProduct = async () => {
  if (!newProduct.value.name.trim()) {
    alert("Product name cannot be empty!");
    return;
  }

  try {
    await axios.post("http://localhost:5000/Product/addproducts", newProduct.value);
    newProduct.value.name = ""; // Reset input field
    fetchProducts(); // Refresh product list
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

// Handle editing a product
const startEditing = (product: Product) => {
  editingProduct.value = { ...product }; // Copy the product object
  updatedName.value = product.name; // Set the input field value
};


const updateProduct = async () => {
  if (!editingProduct.value) return;

  try {
    await axios.put(`http://localhost:5000/Product/editproducts/${editingProduct.value.id}`, {
      name: updatedName.value,
    });

    editingProduct.value = null; // Clear editing state
    fetchProducts(); // Refresh product list
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

// Load all products on mount
onMounted(fetchProducts);
</script>

<template>
  <div class="container">
    <h2>Add Product</h2>

    <form @submit.prevent="addProduct" class="product-form">
      <input v-model="newProduct.name" type="text" placeholder="Enter product name" required />
      <button type="submit">Add Product</button>
    </form>

    <!-- Edit Product Form -->
    <div v-if="editingProduct" class="edit-form">
      <h3>Editing Product: {{ editingProduct.name }}</h3>
      <input v-model="updatedName" type="text" required />
      <button @click="updateProduct">Save</button>
      <button @click="editingProduct = null">Cancel</button>
    </div>

    <!-- Pass products and editing handler to child -->
    <ProductsList :products="products" @productDeleted="fetchProducts" @editProduct="startEditing" />
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
.edit-form {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
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
</style>
