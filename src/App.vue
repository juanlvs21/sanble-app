<template>
  <div id="app">
    <router-view v-if="loggedIn" />
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
    }),
  },
  methods: {
    ...mapActions({
      setLoggedIn: "auth/setLoggedInAction",
    }),
  },
  created() {
    this.setLoggedIn(false);
  },
  mounted() {
    setTimeout(() => {
      this.setLoggedIn(true);
    }, 3000);
  },
};
</script>
