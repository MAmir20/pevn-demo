<script setup lang="ts">
import { computed } from "vue";
import NxButton from "./NxButton.vue";

interface Props {
  title?: string;
  headers: string[];
  data: any[];
  edit?: boolean;
  delete?: boolean;
  show?: boolean;
  search?: boolean;
  add?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  edit: false,
  delete: false,
  show: false,
  search: false,
  add: false,
})

const showActions = computed(() => {
  return props.show || props.edit || props.delete;
});

// Define emits for communicating with the parent
const emit = defineEmits(["add", "delete", "edit", "show", "search"]);
</script>

<template>
  <div class="mt-8">
    <div class="mt-6">
      <h2 class="text-xl font-semibold text-gray-700 leading-tight">
        {{ props.title }}
      </h2>
      <nx-button v-if="props.add" variant="primary" @click="emit('add')">Add</nx-button>

      <div class="mt-3 mx-5 flex flex-col sm:flex-row">
        <div class="block relative mt-2 sm:mt-0" v-if="props.search">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
              <path
                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
              ></path>
            </svg>
          </span>

          <input
            @keyup="emit('search', ($event.target as HTMLInputElement).value)"
            type="text"
            placeholder="Search"
            class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
          />
        </div>
      </div>

      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal table-auto">
            <thead>
              <tr>
                <th
                  v-for="header in props.headers"
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {{ header }}
                </th>
                <th
                  v-if="showActions"
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="props.data.length > 0" v-for="item in props.data" :key="item.id">
                <td
                  v-for="(value, name, index) in item"
                  :key="item.id"
                  class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                >
                  <p class="text-gray-900 whitespace-no-wrap">{{ value }}</p>
                </td>
                <td v-if="showActions" class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span>
                    <nx-button
                      v-if="props.show"
                      variant="primary"
                      @click="emit('show', item.id)"
                      class="ml-2"
                      >Show</nx-button
                    >
                    <nx-button
                      v-if="props.edit"
                      @click="emit('edit', item.id)"
                      variant="secondary"
                      class="ml-2"
                    >
                      Edit
                    </nx-button>
                    <nx-button
                      v-if="props.delete"
                      @click="emit('delete', item.id)"
                      class="ml-2"
                      variant="danger"
                    >
                      Delete
                    </nx-button>
                  </span>
                </td>
              </tr>
              <tr v-else>
                <td
                  class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"
                  :colspan="props.headers.length + (showActions ? 1 : 0)"
                >
                  No data available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
