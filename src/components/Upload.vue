
<template>
    <div class="card">
        <Toast />
        <FileUpload name="file" url="http://localhost:8080/upload" @upload="onSuccessUpload" @error="onUploadError" :multiple="true" :maxFileSize="1000000">
            <template #empty>
                <p>Drag and drop files to here to upload.</p>
            </template>
        </FileUpload>
    </div>
  </template>
  
  <script setup>
  import { useToast } from "primevue/usetoast";
  import { useStore } from '../object/Store'
  import router from '../router';
  
  const toast = useToast();
  
  const onSuccessUpload = (event) => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    router.push("/data");
    useStore().addItem(JSON.parse(event.xhr.response))
    console.log(useStore())
  };
  
  
  const onUploadError = (event) => {
    toast.add({ severity: 'error', summary: 'Error', detail: 'File Upload Failed (format file .xlsx)', life: 3000 });
  };
  
  </script>
  