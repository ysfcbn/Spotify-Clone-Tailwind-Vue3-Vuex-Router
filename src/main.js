import { createApp, defineAsyncComponent } from "vue";
import store from "./store/index.js";
import router from "./router/index.js";

import App from "./App.vue";
import "./index.css";

const app = createApp(App);

app.use(router);

app.use(store);

app.mount("#app");
