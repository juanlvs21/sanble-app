<template>
  <nav class="sb__navbar">
    <div class="sb__navbar-left">
      <img src="/img/logo_text.svg" width="130px" alt="Sanble" />
    </div>
    <div class="sb__navbar-right">
      <vs-button icon dark circle>
        <i class="bx bx-bell" />
      </vs-button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.sb__navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.sb__navbar .sb__navbar-left {
  padding-left: 30px;
}
.sb__navbar .sb__navbar-right {
  padding-right: 30px;
}
</style>

<style>
.sb__navbar .sb__navbar-right .vs-button {
  width: 41px;
  height: 41px;
  background-color: #f4f7f8;
  color: rgba(var(--vs-text), 1);
}
</style>
