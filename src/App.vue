<template>
  <div id="app">
    <MainLayout>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <router-view />
    </MainLayout>
  </div>
</template>

<script>
import MainLayout from "@/components/layouts/MainLayout.vue";

export default {
  name: "App",
  components: {
    MainLayout,
  },
};
</script>
