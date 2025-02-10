<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NxHeader from './components/layout/NxHeader.vue';
import NxFooter from './components/layout/NxFooter.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <nx-header title="Products CRUD with PEVN Stack">
        <RouterLink :to="{name : 'products'}">All Products</RouterLink>
        <RouterLink :to="{name : 'addProduct'}">Add Product</RouterLink>
    </nx-header>

    <!-- Main Content -->
    <main class="flex-1 container mx-auto p-6">
      <router-view /> <!-- This will render child components -->
    </main>

    <!-- Footer -->
    <nx-footer />
  </div>
</template>
