<script setup>
import { ref } from "vue";
import { useStore } from "../object/Store.js";
import Table from "./Table.vue";

// let store = ref(useStore());
// console.log(store.items);

// if (store.value.items.length != 0)
//   window.localStorage.setItem("store", JSON.stringify(store.value.items[0]));
// else store.value = JSON.parse(window.localStorage.getItem("store"));
let store = useStore();
console.log(store.items);


if (store.items.value.length != 0)
  window.localStorage.setItem("store", JSON.stringify(store.items.value[0]));
else store.items.value = Array.from([JSON.parse(window.localStorage.getItem("store"))]);

const error = ref(store.items.value[0].find((element) => element.error == true) !== undefined)
</script>

<template>
  <div>
    <Table v-bind:data="store.items.value[0]"> </Table>
    <a v-if="error" class="text-danger">*Check again in Database</a>
  </div>
</template>

<style scoped>
.text-danger {
  color: #dc3545!important;
}
</style>
