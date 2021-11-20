import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Plugins
import { vuexLocal } from "@/plugins/vuex-persist";

// Modules
import { authModule } from "@/store/modules/auth";

export default new Vuex.Store({
  state: {
    showWelcome: true,
  },
  mutations: {
    setShowWelcomeMutation(state, showWelcome) {
      state.showWelcome = showWelcome;
    },
  },
  actions: {
    setShowWelcomeAction({ commit }, payload) {
      commit("setShowWelcomeMutation", payload);
    },
  },
  modules: {
    auth: authModule,
  },
  plugins: [vuexLocal.plugin],
});
