<template>
  <div class="sb__splash animate__animated animate__fadeIn">
    <div class="container animate__animated animate__zoomIn">
      <img
        src="/img/logo.svg"
        alt="Sanble Logo"
        class="
          sb__splash-logo
          animate__animated animate__infinite animate__pulse
        "
      />
      <h3>Bienvenido a</h3>
      <h1>Sanble</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Splash",
};
</script>

<style scoped>
.sb__splash {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--sb-primary);
  background-image: url("/img/wave1.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
}
.sb__splash .container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.sb__splash-logo {
  width: 93px;
  height: 130px;
}
.sb__splash h3 {
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 4px;
  margin-top: 10px;
  margin-bottom: 0;
}
.sb__splash h1 {
  font-size: 45px;
  font-weight: 700;
  margin-top: 0;
}
.sb__splash-wave {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
