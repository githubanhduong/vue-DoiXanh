
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
