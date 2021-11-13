import Vue from "vue";
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css";

// App
import App from "./App.vue";

// Router
import router from "./router";

// Store
import store from "./store";

// SW
import "./registerServiceWorker";

// Helpers
import { primary, dark } from "./helpers/colors";

Vue.use(Vuesax, {
  colors: {
    primary,
    dark,
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
