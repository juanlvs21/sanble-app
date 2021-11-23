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
  name: "Main-Layout",
  components: { Navbar },
};
</script>

<style scoped>
main {
  padding: 70px 30px 20px;
}
</style>
