<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    variant: string;
}>();

const emit = defineEmits(["click"]);
const computedClass = computed(() => {
    switch (props.variant) {
        case "primary":
            return "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
        case "secondary":
            return "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded";
        case "danger":
            return "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded";
        case "info":
            return "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded";
    }
});
</script>

<template>
  <button
    @click.prevent="emit('click')"
    :class="[computedClass]"
  >
    <slot />
  </button>
</template>
