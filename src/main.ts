import naive from "naive-ui";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/style.css";
import router from "./router";

const app = createApp(App);
app.use(router);
app.use(naive);
app.mount("#app");
