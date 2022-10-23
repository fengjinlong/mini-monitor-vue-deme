import { createApp } from "vue";
import "./style.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./goable.css";
import App from "./App.vue";
// import { MitoVue, init } from "@zyf2e/monitor-web";
import minimonitornpm from "mini-monitor-npm";
// import M from "./M";
const app = createApp(App);
app.use(minimonitornpm);
app.use(ElementPlus);
// app.use(M);
// init({
//   dsn: "http://test.com/error",
//   apikey: "123-2223-123-123",
// });
app.mount("#app");
