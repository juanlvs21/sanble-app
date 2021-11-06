<template>
  <div>
    <Navbar />
    <main>
      <slot />
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar.vue";

export default {
  name: "MainLayout",
  components: { Navbar },
};
</script>

<style scoped>
main {
  padding: 80px;
}
</style>
