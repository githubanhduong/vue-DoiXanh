<script setup>
import { useStore } from '../object/User.js';
// import Table from './Table.vue'

let store = useStore();
console.log(store.items)

if (store.items.value.length != 0) window.localStorage.setItem("store", JSON.stringify(store.items.value[0]));
else store.value = JSON.parse(window.localStorage.getItem("store"));

</script>

<template>
  <div>
    <!-- <Table>

    </Table> -->
    <a > {{ store.value }} </a>
    <!-- <ul v-if="store.items">
      <li>{{ store.items[0].name }}</li>
    </ul>
    <button @click="store.addItem({ name: 'New Item' })">Add Item</button> -->
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
