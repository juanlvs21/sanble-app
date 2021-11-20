<template>
  <div>
    <WelcomeSlide
      v-if="show"
      v-bind="slides[active]"
      :active="active"
      :total="slides.length"
    />
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
          handleGoBack: this.handleBack,
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
          handleGoBack: this.handleBack,
        },
        {
          bgImage: "/img/welcome/welcome-wave4.svg",
          image: "/img/welcome/welcome-illustration4.svg",
          imageWidth: 230,
          title: "¡Emprende!",
          subTitle:
            "Crea tu propio Stand o incluso ¡Tu Feria! Y luego mira lo que la gente piensa de ellos",
          handleBtnPrimary: this.handleNext,
          textBtnPrimary: "And now...",
          darkBtnPrimary: true,
          handleGoBack: this.handleBack,
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
          handleGoBack: this.handleBack,
        },
      ],
    };
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
      this.effect();
      this.active -= 1;
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
