<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    variant: string;
}>();

const computedClass = computed(() => {
    switch (props.variant) {
        case "primary":
            return "bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded";
        case "secondary":
            return "bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded";
        case "danger":
            return "bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded";
        case "info":
            return "bg-teal-800 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded";
    }
});
</script>

<template>
  <button
    @click.self.prevent
    :class="[computedClass]"
  >
    <slot />
  </button>
</template>
