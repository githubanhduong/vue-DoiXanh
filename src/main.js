import './assets/main.css'
import apiClient from "./http-common";
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import Button from "primevue/button"
import Toast from 'primevue/toast'; 
import { createApp } from 'vue'
import App from './App.vue'
import ToastService from 'primevue/toastservice';
import InputText from 'primevue/inputtext';
import FileUpload from 'primevue/fileupload'; // Import FileUpload component
import router from './router'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional


const app = createApp(App);

app.use(PrimeVue);
app.use(router);
app.use(ToastService); // Use ToastService

app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Button', Button);
app.component('FileUpload', FileUpload);
app.component('InputText', InputText);
app.component('Toast', Toast); // Register Toast component

app.mount('#app');

