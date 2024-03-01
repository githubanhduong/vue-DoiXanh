import { ref } from "vue";

let instance;

export const useStore = () => {
  if (instance) return instance;

  const items = ref([]);

  const addItem = (newItem) => {
    items.value.push(newItem);
  };

  const removeItem = (index) => {
    items.value.splice(index, 1);
  };

  instance = {
    items,
    addItem,
    removeItem,
  };

  return instance;
};
