<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{ variant: string; isSubmit?: boolean; isDisabled?: boolean }>(), {
    isSubmit: false,
    isDisabled: false,
});

const variantClass = computed(() => {
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

const disabledClass = computed(() => {
    return props.isDisabled ? "opacity-50 cursor-not-allowed" : "";
});
</script>

<template>
  <button
    :class="[variantClass, disabledClass]"
    :type="props.isSubmit ? 'submit' : 'button'"
    :disabled="props.isDisabled"
  >
    <slot />
  </button>
</template>
