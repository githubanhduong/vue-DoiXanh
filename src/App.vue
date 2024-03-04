<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue';
import router from './router';

// Navigation guards
onMounted(() => {
  router.beforeEach((to, from, next) => {
    // You can add your navigation guards logic here
    next();
  });
});

</script>
<style>
  html, body {
    background-color: white;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    font-size: 16px;
    color: #333;
  }
</style>
