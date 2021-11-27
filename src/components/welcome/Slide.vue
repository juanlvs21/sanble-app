<template>
  <section
    class="animate__animated animate__fadeIn"
    :style="{ backgroundImage: `url('${bgImage}')` }"
  >
    <div class="sb__welcome-content">
      <img
        :src="image"
        :alt="title"
        :width="`${imageWidth}px`"
        class="animate__animated animate__bounceIn"
      />
      <h1>{{ title }}</h1>
      <p v-show="subTitle">{{ subTitle }}</p>
    </div>
    <div class="sb__welcome-btn-container">
      <vs-button :dark="darkBtnPrimary" @click="handleBtnPrimary" block>
        {{ textBtnPrimary }}
      </vs-button>
      <vs-button
        v-if="textBtnSecondary && handleBtnSecondary"
        @click="handleBtnSecondary"
        block
        transparent
      >
        {{ textBtnSecondary }}
      </vs-button>
    </div>
  </section>
</template>

<script>
export default {
  name: "Welcome-Slide",
  props: {
    bgImage: {
      require: true,
      type: String,
    },
    imageWidth: {
      type: Number,
      default: 300,
    },
    image: {
      require: true,
      type: String,
    },
    title: {
      require: true,
      type: String,
    },
    subTitle: {
      type: String,
    },
    handleBtnPrimary: {
      require: true,
      type: Function,
    },
    textBtnPrimary: {
      require: true,
      type: String,
    },
    darkBtnPrimary: {
      type: Boolean,
      default: false,
    },
    handleBtnSecondary: {
      type: Function,
    },
    textBtnSecondary: {
      type: String,
    },
    handleGoBack: {
      type: Function,
    },
  },
};
</script>

<style scoped>
section {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  display: grid;
  flex-direction: column;
}
section .sb__welcome-content {
  height: calc(100vh - 150px);
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 30px;
}
section .sb__welcome-content h1 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 0;
}
section .sb__welcome-content p {
  font-size: 14px;
  font-weight: 500;
  color: #23202080;
  padding: 0 20px;
}
section .sb__welcome-btn-container {
  height: 100px;
  padding: 0 30px 50px;
}
@media (min-width: 768px) {
  section {
    justify-content: center;
    align-items: center;
  }
  section .sb__welcome-content,
  section .sb__welcome-btn-container {
    width: 600px;
    border-radius: 20px;
  }
  section .sb__welcome-content {
    min-height: auto;
  }
}
</style>
