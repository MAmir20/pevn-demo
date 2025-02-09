<script setup lang="ts">
import ProductService from "@/services/ProductService";
import type { Product } from "@/models/Product";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import NxButton from "../ui/NxButton.vue";

const router = useRouter();
const product = ref<Product | null>(null); // Stores the product being edited
const productId = Number(router.currentRoute.value.params.id); 
onMounted(() => {
    const productId = Number(router.currentRoute.value.params.id);
    ProductService.get(productId).then((data) => {
      product.value = { ...data };
    });
});

const deleteProduct = async () => {
  if (confirm("Are you sure you want to delete this product?")) {
    try {
      ProductService.delete(productId).then(() => {
        console.log("Product deleted");
        router.push({name : "products"})
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }
};

const editProduct = async () => {
  router.push({ name: "editProduct", params: { id: productId.toString() } });
};

</script>

<template>
  <div class="mt-4">
    <div class="mt-4">
      <div class="w-full bg-white shadow-md rounded-md overflow-hidden border">
        <div
          class="flex justify-between items-center px-5 py-3 text-gray-700 border-b"
        >
          <h3 class="text-sm">
            {{ product?.name }}
          </h3>
        </div>
          <div class="px-5 py-6 bg-gray-100 text-gray-700 border-b">
              <ul>
                <li><b>ID: </b>{{ product?.id }}</li>
                <li><b>Name: </b>{{ product?.name }}</li>
              </ul>
          </div>

          <div class="flex justify-between items-center px-5 py-3">
            <nx-button
              variant="secondary"
              @click="editProduct"
            >
              Edit
            </nx-button>
            <nx-button
              variant="danger"
              @click="deleteProduct"
            >
              Delete
            </nx-button>
          </div>
      </div>
    </div>
  </div>
</template>