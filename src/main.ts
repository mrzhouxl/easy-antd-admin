import { createApp, provide, ref } from "vue";
import App from "./App.vue";
import "./assets/css/style.css";
import "nprogress/nprogress.css";
import "ant-design-vue/dist/antd.css";
import router from "./router/index";
import DescriptionsItem from "ant-design-vue/lib/descriptions";
import Antd from "ant-design-vue";
import { MyIcon } from "./components/Icon";
import store from "./store/store";


const app = createApp(App);
app.use(store);
app.component("MyIcon", MyIcon);
//@ts-ignore
app.config.productionTip = false;

app.use(Antd);
app.use(router);
app.mount("#app");

