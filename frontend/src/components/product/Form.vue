<script setup lang="ts">
import ProductService from "@/services/ProductService";
import type { Product } from "@/models/Product";
import { ref, watch, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import NxButton from "../ui/NxButton.vue";

interface FormData {
  name?: string;
}

const route = useRoute();
const router = useRouter();
const editingProduct = ref<Product | null>(null);
const formData = ref<FormData>({ name: "" });
const editMode = ref(false);
const errorMessage = ref<string | null>(null);
const isTouched = ref(false);

const updateMode = () => {
  editMode.value = route.name === "editProduct";
  if (editMode.value) {
    const productId = Number(route.params.id);
    ProductService.get(productId).then((product) => {
      formData.value.name = product.name;
      editingProduct.value = { ...product };
    });
  } else {
    formData.value = { name: "" };
    editingProduct.value = null;
  }
};

const validateForm = () => {
  isTouched.value = true;
  if (!formData.value.name?.trim()) {
    errorMessage.value = "Product name cannot be empty!";
    return false;
  }
  errorMessage.value = null;
  return true;
};

// Computed property to apply red border when invalid
const isInvalid = computed(() => isTouched.value && !formData.value.name?.trim());

watch(() => route.fullPath, updateMode);
onMounted(updateMode);

const submitForm = async () => {
  if (!validateForm()) return;

  try {
    if (editMode.value) {
      await ProductService.update(editingProduct.value!.id, formData.value);
    } else {
      await ProductService.create(formData.value);
    }
    router.push("/");
  } catch (error) {
    console.error("Error submitting the form:", error);
  }
};

const resetForm = () => {
  formData.value.name = editMode.value ? editingProduct.value?.name : "";
  errorMessage.value = null;
  isTouched.value = false;
};
</script>

<template>
  <div class="mt-4">
    <div class="mt-4">
      <div class="w-full bg-white shadow-md rounded-md overflow-hidden border">
        <div class="flex justify-between items-center px-5 py-3 text-gray-700 border-b">
          <h3 class="text-sm">
            {{ editMode ? "Editing Product '" + formData.name + "'" : "Add Product" }}
          </h3>
        </div>
        <form class="product-form" @submit.prevent="submitForm">
          <div class="px-5 py-6 bg-gray-100 text-gray-700 border-b">
            <label class="text-xs">Name</label>

            <div class="mt-2 relative rounded-md shadow-sm">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </span>

              <input 
                v-model="formData.name" 
                type="text" 
                @input="validateForm"
                @keyup.enter="submitForm"
                class="form-input w-full px-12 py-2 appearance-none rounded-md border focus:border-indigo-600"
                :class="{ 'border-red-500': isInvalid }"
              />

              <!-- Error Message -->
              <p v-if="errorMessage" class="text-red-500 text-sm mt-1">
                {{ errorMessage }}
              </p>
            </div>
          </div>

          <div class="flex justify-between items-center px-5 py-3">
            <nx-button variant="info" @click.prevent="resetForm">
              Reset
            </nx-button>
            <nx-button variant="primary" @click="submitForm">
              Save
            </nx-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
