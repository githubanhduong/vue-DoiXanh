// import { ref } from "vue";

// let instance;

// export const useStore = () => {
//   if (instance) return instance;

//   const items = ref([]);

//   const addItem = (newItem) => {
//     items.value.push(newItem);
//   };

//   const removeItem = (index) => {
//     items.value.splice(index, 1);
//   };

//   instance = {
//     items,
//     addItem,
//     removeItem,
//   };

//   return instance;
// };

export default class User {

  constructor(createdAt, email, error, firstName, groupId, id, lastName, phone, updatedAt) {
    this.createdAt = createdAt;
    this.email = email;
    this.error = error;
    this.firstName = firstName;
    this.groupId = groupId;
    this.id = id;
    this.lastName = lastName;
    this.phone = phone;
    this.updatedAt = updatedAt;
  }
}