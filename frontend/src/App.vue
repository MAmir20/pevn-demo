<!-- <script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue';
</script>

<template>
  <Header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="Products CRUD with PEVN Stack" />

      <nav>
        <RouterLink to="/">All Products</RouterLink>
        <RouterLink to="/addProduct">Add Product</RouterLink>
      </nav>
    </div>
  </Header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
<!-- <script setup lang="ts">
import NxTable from './components/NxTable.vue';
const headers = ['ID', 'Name', 'Description', 'Price'];
const data = [
  { id: 1, name: 'Product 1', description: 'Description 1', price: 100 },
  { id: 2, name: 'Product 2', description: 'Description 2', price: 200 },
  { id: 3, name: 'Product 3', description: 'Description 3', price: 300 },
  { id: 4, name: 'Product 4', description: 'Description 4', price: 400 },
  { id: 5, name: 'Product 5', description: 'Description 5', price: 500 },
];
</script>
<template>
  <nx-table search @search="(data) => console.log(data)" title="Products" :headers="headers" :data="data" edit show delete :add="true" @add="console.log('add')" />
</template> -->

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
