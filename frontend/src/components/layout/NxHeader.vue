<script setup lang="ts">
const props = defineProps({
  title: String,
});
</script>

<template>
  <!-- Header -->
  <header class="bg-blue-600 text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-semibold">{{ title }}</h1>
        <nav>
          <ul class="flex gap-4">
            <slot />
          </ul>
        </nav>
      </div>
    </header>
</template>
