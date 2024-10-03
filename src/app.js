import './assets/css/app.css';
import 'nprogress/nprogress.css';
import 'primeicons/primeicons.css';

import customThemePreset from '../theme-preset.js';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import router from './router';

import App from './App.vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia)
    .use(router)
    .use(PrimeVue, {
        theme: customThemePreset,
    })
    .use(ToastService)
    .component('InputText', InputText)
    .component('Button', Button)
    .mount('#app');
