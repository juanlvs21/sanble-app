import Vue from "vue";
import Vuesax from "vuesax";

// App
import App from "./App.vue";

// Router
import router from "./router";

// Store
import store from "./store";

// SW
import "./registerServiceWorker";

// CSS
import "vuesax/dist/vuesax.css";

Vue.use(Vuesax, {
  colors: {
    primary: "#FF7315",
    dark: "#3A3535",
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
