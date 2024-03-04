<template>
          <Toast />

  <div class="container">
    <div class="button-wrapper">
      <Button
        @click="updateUser"
        type="button"
        label="Update"
        class="p-button-label"
        :badge="productCount"
      />
    </div>
    <div class="button-wrapper-end">
      <Button
        icon="pi pi-external-link"
        @click="exportExcel"
        type="button"
        label="Export"
        class="p-button-label justify-content-end"
      />
    </div>
  </div>
  <div class="card p-fluid">
    <DataTable
      v-model:selection="selectedProduct"
      v-model:editingRows="editingRows"
      :value="data"
      editMode="row"
      dataKey="id"
      @row-edit-save="onRowEditSave"
      :rowClass="rowClass"
      :pt="{
        table: { style: 'min-width: 50rem' },
        row: {
          bodyrow: ({ props }) => ({
            class: [{ 'font-bold': props.frozenRow }],
          }),
        },
      }"
    >
      <Column
        field="CheckBox"
        header=""
        selectionMode="multiple"
        style="width: 10%"
        headerStyle="width: 3rem"
      >
      </Column>
      <Column field="id" header="Id" style="width: 20%"> </Column>
      <Column field="groupId" header="GroupId" style="width: 10%">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
      </Column>
      <Column field="firstName" header="FirstName" style="width: 20%"> </Column>
      <Column field="lastName" header="LastName" style="width: 20%"> </Column>
      <Column field="email" header="Email" style="width: 20%"> </Column>
      <Column field="phone" header="Phone" style="width: 20%"> </Column>
      <Column field="createdAt" header="CreatedAt" style="width: 20%">
        <template #body="{ data }">
          {{ showLocalTime(data.createdAt) }}
        </template>
      </Column>
      <Column field="updatedAt" header="UpdateAt" style="width: 20%">
        <template #body="{ data }">
          {{ showLocalTime(data.createdAt) }}
        </template>
      </Column>
      <Column
        :rowEditor="true"
        style="width: 10%; min-width: 8rem"
        bodyStyle="text-align:center"
      ></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import http from "../http-common";
import { useToast } from "primevue/usetoast";

// const products = ref();
const editingRows = ref([]);

onMounted(() => {
  // ProductService.getProductsMini().then((data) => (products.value = data));
});

const onRowEditSave = (event) => {
  let { newData, index } = event;
  console.log(event);
  props.data[index] = newData;
};

const rowClass = (data) => {
  if (data.error) {
    return "row-red";
  }
};

const props = defineProps({
  data: Array,
});

const selectedProduct = ref();

const productCount = computed(() =>
  selectedProduct.value != undefined
    ? Object.keys(selectedProduct.value).length
    : null
);
const jsonData = {};
const dataPost = () => {
  selectedProduct.value?.forEach((element) => {
    jsonData[element.id] = props.data.find(
      (user) => user.id == element.id
    ).groupId;
  });
};

const toast = useToast();

watch(props.data, async (newQuestion, oldQuestion) => {
  localStorage.setItem('store', JSON.stringify(props.data))
})


const updateUser = () => {
  localStorage.setItem('store', props.data)
  dataPost();
  http
    .put("/test", jsonData)
    .then((response) =>
      toast.add({
        severity: "info",
        summary: "Success",
        detail: "Success",
        life: 3000,
      })
    )
    .catch((error) =>
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Failed",
        life: 3000,
      })
    );
};

const exportExcel = () => {
  http
    .post("/export", props.data, { responseType: "blob" })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "userlist.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      toast.add({
        severity: "info",
        summary: "Success",
        detail: "Success",
        life: 3000,
      });
    })
    .catch((error) =>
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Failed",
        life: 3000,
      })
    );
};

const showLocalTime = (dateString) => {
  const date = new Date(dateString);
  const utcOffset = date.getTimezoneOffset(); // Get current UTC offset in minutes
  const localTime = new Date(
    date.getTime() + (utcOffset / -60) * 60 * 60 * 1000 + utcOffset * 60 * 1000
  );
  return localTime.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
</script>

<style>
.row-red {
  color: red !important;
}
.container {
  display: flex;
  justify-content: space-between;
}

.button-wrapper {
  flex: 1; /* Ensures buttons take up remaining space equally */
  margin: 0 10px; /* Optional: Add margin between buttons */
}
.button-wrapper-end {
  flex: -1; /* Ensures buttons take up remaining space equally */
  margin: 0 10px; /* Optional: Add margin between buttons */
}
</style>
