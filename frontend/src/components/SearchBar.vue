<template>
    <div>
      <input v-model="query" @input="search" type="text" placeholder="Search..." />
      <ul>
        <li v-for="item in results" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        query: '',
        results: [],
      };
    },
    methods: {
      async search() {
        if (this.query.length >= 1) {
          try {
            const response = await axios.get(`http://localhost:5000/search?q=${this.query}`);
            this.results = response.data;
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        } else {
          this.results = [];
        }
      },
    },
  };
  </script>
  