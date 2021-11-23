export const authModule = {
  namespaced: true,
  state: {
    loggedIn: false,
  },
  mutations: {
    setLoggedInMutation(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
  },
  actions: {
    setLoggedInAction({ commit }, payload) {
      commit("setLoggedInMutation", payload);
    },
  },
};
