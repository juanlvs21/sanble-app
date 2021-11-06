<template>
  <nav class="sb__navbar">
    <vs-navbar color="dark" square text-white>
      <template #left>
        <img
          src="/assets/images/Logo_Horizontal_Light.png"
          alt="Sanble"
          height="30px"
        />
      </template>
      <template #right>
        <vs-button flat>Iniciar Sesión</vs-button>
        <vs-button>Registrarse</vs-button>
      </template>
    </vs-navbar>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style>
.sb__navbar .vs-navbar {
  height: 50px;
}
</style>

<style scoped>
.sb__navbar {
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
