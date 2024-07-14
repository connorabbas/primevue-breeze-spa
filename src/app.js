import './assets/css/app.css';
import 'nprogress/nprogress.css';
import 'primeicons/primeicons.css';

import customizedThemePreset from '@/modules/theme-preset.mjs';

import { createApp } from "vue";
import { createPinia } from "pinia";

import router from "./router";

import App from "./App.vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const app = createApp(App);

app.use(createPinia())
    .use(router)
    .use(PrimeVue, {
        theme: {
            preset: customizedThemePreset,
            options: {
                darkModeSelector: '.dark-mode',
                cssLayer: {
                    name: 'primevue',
                    order: 'tailwind-base, primevue, tailwind-utilities',
                },
            },
        },
    })
    .use(ToastService)
    .component("InputText", InputText)
    .component("Button", Button)
    .mount("#app");
