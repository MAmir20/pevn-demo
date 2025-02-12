<script setup lang="ts">
import NxTable from "@/components/ui/NxTable.vue";
import ProductService from "@/services/ProductService";
import type { Product } from "@/models/Product";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = withDefaults(defineProps<{withAdd? : boolean}>(), {
  withAdd: false,
});

const headers: string[] = ["ID", "Name", "Creation Time", "Update Time"];
const products = ref<Product[]>([]); // Holds the product list

onMounted(() => {
  fetchProducts();
});

const fetchProducts = async () => {
  try {
    const response = await ProductService.getAll();    
    products.value = response;
    console.log(response);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const deleteProduct = async (id: number) => {
  if (confirm("Are you sure you want to delete this product?")) {
    try {
      ProductService.delete(id).then(() => {
        console.log("Product deleted");
        fetchProducts();
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }
};
const searchProduct = async (searchTerm: string) => {
  try {
    const response = await ProductService.search(searchTerm);
    products.value = response;
    console.log(response);
  } catch (error) {
    console.error("Error searching products:", error);
  }
};

const router = useRouter();

const addProduct = async () => {
  router.push({ name: "addProduct" });
};

const showProduct = async (id: number) => {
  router.push({ name: "showProduct", params: { id: id.toString() } });
};

const editProduct = async (id: number) => {
  router.push({ name: "editProduct", params: { id: id.toString() } });
};
</script>

<template>
    <nx-table
      :headers="headers"
      :data="products"
      show
      edit
      delete
      :add="props.withAdd"
      search
      title="Products list"
      @delete="(id) => deleteProduct(id)"
      @show="(id) => showProduct(id)"
      @add="addProduct"
      @edit="(id) => editProduct(id)"
      @search="(searchTerm) => searchProduct(searchTerm)"
    />
</template>
