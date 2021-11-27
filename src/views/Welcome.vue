<template>
  <div>
    <div class="sb__welcome-btn-back">
      <transition name="fade" mode="out-in">
        <vs-button
          v-if="this.active"
          color="primary"
          @click="handleBack"
          circle
          icon
        >
          <i class="bx bxs-chevron-left" />
        </vs-button>
      </transition>
    </div>
    <WelcomeSlide v-if="show" v-bind="slides[active]" />
    <div class="sb__welcome-progress-container">
      <div class="sb__welcome-progress">
        <div class="active" :style="{ width: progressBar }" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import WelcomeSlide from "@/components/welcome/Slide.vue";

export default {
  name: "Welcome-View",
  components: {
    WelcomeSlide,
  },
  data() {
    return {
      show: true,
      active: 0,
      slides: [
        {
          bgImage: "/img/welcome/welcome-wave1.svg",
          image: "/img/welcome/welcome-illustration1.svg",
          title: "Bienvenido",
          subTitle:
            "¿Estás listo para vivir tus ferias favoritas de una manera más cercana a ti?",
          handleBtnPrimary: this.handleNext,
          textBtnPrimary: "Vamos",
          darkBtnPrimary: false,
        },
        {
          bgImage: "/img/welcome/welcome-wave2.svg",
          image: "/img/welcome/welcome-illustration2.svg",
          imageWidth: 240,
          title: "Disfruta lo mejor",
          subTitle:
            "Las Ferias y Stands más populares, y además, ¡tú mismo puedes dar tu opinión sobre ellos!",
          handleBtnPrimary: this.handleNext,
          textBtnPrimary: "Ver más",
          darkBtnPrimary: true,
        },
        {
          bgImage: "/img/welcome/welcome-wave3.svg",
          image: "/img/welcome/welcome-illustration3.svg",
          title: "Encuéntralas",
          subTitle:
            "Encuentra las Ferias que más te gusten y los Stands más llamativos en cualquier lugar",
          handleBtnPrimary: this.handleNext,
          textBtnPrimary: "Ya casi",
          darkBtnPrimary: false,
        },
        {
          bgImage: "/img/welcome/welcome-wave4.svg",
          image: "/img/welcome/welcome-illustration4.svg",
          imageWidth: 230,
          title: "¡Emprende!",
          subTitle:
            "Crea tu propio Stand o incluso ¡Tu Feria! Y luego mira lo que la gente piensa de ellos",
          handleBtnPrimary: this.handleNext,
          textBtnPrimary: "Y ahora...",
          darkBtnPrimary: true,
        },
        {
          bgImage: "/img/welcome/welcome-wave5.svg",
          image: "/img/welcome/welcome-illustration5.svg",
          title: "¿Bueno, qué estás esperando?",
          handleBtnPrimary: this.handleGoAuth,
          textBtnPrimary: "Registrarse",
          darkBtnPrimary: false,
          handleBtnSecondary: this.handleGoSkip,
          textBtnSecondary: "Quizás mas tarde",
        },
      ],
    };
  },
  computed: {
    progressBar() {
      const progress = (100 / this.slides.length) * (this.active + 1);
      return `${progress}%`;
    },
  },
  methods: {
    ...mapActions({
      setShowWelcome: "setShowWelcomeAction",
    }),
    effect() {
      this.show = false;
      setTimeout(() => {
        this.show = true;
      }, 1);
    },
    handleNext() {
      this.effect();
      this.active += 1;
    },
    handleBack() {
      if (this.active !== 0) {
        this.effect();
        this.active -= 1;
      }
    },
    handleGoAuth() {
      this.setShowWelcome(false);
      this.$router.replace({ name: "auth" });
    },
    handleGoSkip() {
      this.setShowWelcome(false);
      this.$router.replace({ name: "dashboard" });
    },
  },
};
</script>

<style scoped>
.sb__welcome-btn-back {
  position: absolute;
  top: 20px;
  left: 20px;
}
.sb__welcome-progress-container {
  width: 100%;
  height: 40px;
  display: block;
  position: fixed;
  bottom: 0;
}
.sb__welcome-progress {
  display: flex;
  height: 7px;
  margin: 15px 30px 0;
  border-radius: 20px;
  background-color: #ff86343d;
  position: relative;
}
.sb__welcome-progress .active {
  height: 7px;
  border-radius: 20px;
  background-color: var(--sb-primary);
  transition: all 300ms ease-in-out;
}
@media (min-width: 768px) {
  .sb__welcome-progress-container {
    display: flex;
    justify-content: center;
  }
  .sb__welcome-btn-back,
  .sb__welcome-progress {
    width: 600px;
    border-radius: 20px;
  }
}
</style>

<style>
.sb__welcome-btn-back button {
  height: 41px;
  width: 41px;
}
</style>
