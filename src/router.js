// Import necessary modules
import { createRouter, createWebHistory } from 'vue-router';

// Import your Vue components
import Upload from './components/Upload.vue';
import Data from './components/Data.vue';

// Create routes
const routes = [
  {
    path: '/', // Matches root path
    redirect: '/upload', // Redirect to /upload path
  },

  { path: '/upload', component: Upload },
  { path: '/data', component: Data }
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
