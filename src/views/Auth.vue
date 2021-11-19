<template>
  <div class="sb__auth">
    <div class="container">
      <section class="logo-container">
        <img src="/img/logo.svg" alt="Sanble Logo" />
        <span>Sanble</span>
      </section>
      <section class="content-container">
        <Tabs :active="activeTab" :onTab="handleOnTab" />

        <transition name="slide-auth-fade" mode="out-in">
          <Signin key="signin" v-if="activeTab === 'signin'" />
          <Signup key="signup" v-else />
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
import Tabs from "@/components/auth/Tabs.vue";
import Signin from "@/components/auth/Signin.vue";
import Signup from "@/components/auth/Signup.vue";

export default {
  name: "Auth-View",
  components: {
    Tabs,
    Signin,
    Signup,
  },
  data() {
    return {
      activeTab: "signin",
    };
  },
  methods: {
    handleOnTab(active) {
      this.activeTab = active;
    },
  },
};
</script>

<style scoped>
.sb__auth {
  display: flex;
  margin: 0;
  transition: all 300ms ease-in-out;
}
.sb__auth .container {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background-image: url("/img/wave2.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
  transition: all 300ms ease-in-out;
}
.sb__auth .logo-container {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 300ms ease-in-out;
}
.sb__auth .logo-container img {
  width: 40px;
}
.sb__auth .logo-container span {
  font-size: 30px;
  font-weight: 700;
  margin-left: 10px;
  color: var(--sb-primary);
}
.slide-auth-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-auth-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-auth-fade-enter,
.slide-auth-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
@media (min-width: 320px) {
  .sb__auth .logo-container img {
    width: 50px;
  }
}
@media (min-width: 360px) {
  .sb__auth .logo-container {
    height: 140px;
  }
  .sb__auth .logo-container img {
    width: 63.3px;
  }
  .sb__auth .logo-container span {
    font-size: 45px;
  }
}
@media (min-width: 768px) {
  .sb__auth {
    padding: 20px;
    background-color: var(--sb-primary);
  }
  .sb__auth .container {
    width: 700px;
    border: 2px solid var(--sb-primary);
    border-radius: 24px;
    margin: auto;
    -webkit-box-shadow: 5px 5px 6px 0px rgba(0, 0, 0, 0.3);
    box-shadow: 5px 5px 6px 0px rgba(0, 0, 0, 0.3);
    height: auto;
    overflow-x: hidden;
    overflow-y: hidden;
    background-color: #fff;
  }
  .sb__auth .logo-container {
    height: 150px;
  }
}
</style>

<style>
.sb__auth .sb__auth-form h1 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  display: flex;
  position: relative;
}
.sb__auth .sb__auth-form h1 span {
  z-index: 5;
}
.sb__auth .sb__auth-form h3 {
  font-size: 14px;
  font-weight: 500;
  margin-top: 0;
}
.sb__auth .sb__auth-form form {
  margin-top: 40px;
}
.sb__auth .sb__auth-form .input {
  margin-top: 30px;
}
.sb__auth-form .input i {
  color: var(--sb-primary);
}
.sb__auth .sb__auth-form .btn {
  margin-top: 55px;
  height: 45px;
}
.sb__auth .sb__auth-form .errors {
  margin-top: 30px;
  height: auto !important;
}
.sb__auth .sb__auth-form .btn-google {
  margin-top: 10px;
  height: 45px;
}
.sb__auth-form .input .vs-input {
  width: 100%;
  height: 45px;
}
.sb__auth .sb__auth-form .btn .vs-button__content,
.sb__auth .sb__auth-form .btn-google .vs-button__content {
  font-size: 18px;
  font-weight: 500;
}
</style>
