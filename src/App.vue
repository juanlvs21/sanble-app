<template>
  <div id="app">
    <router-view v-if="loggedIn || showWelcome" />
    <Splash v-else />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import Splash from "@/components/common/Splash.vue";

export default {
  name: "App",
  components: {
    Splash,
  },
  computed: {
    ...mapState({
      loggedIn: ({ auth }) => auth.loggedIn,
      showWelcome: ({ showWelcome }) => showWelcome,
    }),
  },
  methods: {
    ...mapActions({
      setLoggedIn: "auth/setLoggedInAction",
    }),
  },
  created() {
    if (this.showWelcome) this.$router.replace({ name: "welcome" });
    this.setLoggedIn(false);
  },
  mounted() {
    setTimeout(() => {
      this.setLoggedIn(true);
    }, 3000);
  },
};
</script>
