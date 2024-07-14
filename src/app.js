import { createApp } from "vue";
import { createPinia } from "pinia";

import router from "./router";

import App from "./App.vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

import 'nprogress/nprogress.css';

const app = createApp(App);

app.use(createPinia())
    .use(router)
    .use(PrimeVue)
    .use(ToastService)
    .component("InputText", InputText)
    .component("Button", Button)
    .mount("#app");
