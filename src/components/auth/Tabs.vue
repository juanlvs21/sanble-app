<template>
  <div class="sb__auth-tabs">
    <div class="tabs-container">
      <div :class="['tab', tabSigninActive]" @click="onTab('signin')">
        Ingresar
      </div>
      <div :class="['tab', tabSignupActive]" @click="onTab('signup')">
        Registrarse
      </div>
    </div>
    <div class="line">
      <div :class="['active', activePos]" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth-Tabs",
  props: {
    active: {
      type: String,
      require: true,
      validator: (value) => ["signin", "signup"].indexOf(value) !== -1,
    },
    onTab: {
      type: Function,
      require: true,
    },
  },
  computed: {
    tabSigninActive() {
      return this.active === "signin" ? "active" : "";
    },
    tabSignupActive() {
      return this.active === "signup" ? "active" : "";
    },
    activePos() {
      return this.active === "signup" ? "right" : "left";
    },
  },
};
</script>

<style scoped>
.sb__auth-tabs .tabs-container {
  display: flex;
}
.sb__auth-tabs .tab {
  width: 100%;
  height: 45px;
  font-size: 18px;
  font-weight: 600;
  transition: all 300ms ease-in-out;
  color: #3a353526;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sb__auth-tabs .tab:hover {
  font-weight: 700;
  font-size: 19px;
  color: #3a3535d6;
}
.sb__auth-tabs .tab.active {
  color: var(--sb-primary);
}
.sb__auth-tabs .line {
  width: 100%;
  height: 7px;
  background-color: #3a353526;
  position: relative;
}
.sb__auth-tabs .line .active {
  background-color: var(--sb-primary);
  width: 50%;
  height: 7px;
  position: absolute;
  border-radius: 45px;
  transition: left 300ms ease-in-out;
}
.sb__auth-tabs .line .active.left {
  left: 0;
}
.sb__auth-tabs .line .active.right {
  left: 50vw;
}
@media (min-width: 768px) {
  .sb__auth-tabs .line .active.right {
    left: 350px;
  }
}
</style>
