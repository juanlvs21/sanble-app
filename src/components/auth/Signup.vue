<template>
  <div class="sb__auth-form">
    <h1>
      <span>Crea tu Cuenta</span>
      <div />
    </h1>
    <h3>Unete a la Plataforma de Sanble</h3>
    <form @submit.prevent="onSubmit">
      <vs-input v-model.trim="user.name" placeholder="Nombre" class="input">
        <template #icon>
          <i class="bx bx-user"></i>
        </template>
      </vs-input>
      <vs-input
        v-model.trim="user.email"
        placeholder="Correo electrónico"
        class="input"
      >
        <template #icon>
          <i class="bx bx-at"></i>
        </template>
      </vs-input>
      <vs-input
        type="password"
        v-model.trim="user.password"
        placeholder="Contraseña"
        class="input"
      >
        <template #icon>
          <i class="bx bxs-key"></i>
        </template>
      </vs-input>

      <vs-button class="btn" button="submit" block>Ingresar</vs-button>
    </form>

    <vs-button class="btn-google" block transparent @click="handleSignupGoogle">
      <i class="bx bxl-google"></i> Únete con Google
    </vs-button>
  </div>
</template>

<script>
import * as yup from "yup";

import { notificationList } from "@/helpers/notifications";

export default {
  name: "Signup",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
      schema: yup.object().shape({
        name: yup.string().required("Nombre es obligatorio"),
        email: yup
          .string()
          .required("El correo electrónico es obligatorio")
          .email("Ingrese un correo electrónico válido"),
        password: yup.string().required("La contraseña es obligatoria"),
      }),
    };
  },
  methods: {
    handleSignupGoogle() {
      this.$vs.notification({
        position: "bottom-center",
        title: "Viva Google",
        text: `Proximamente`,
      });
    },
    onSubmit() {
      this.schema
        .validate(this.user)
        .then(() => {
          this.$vs.notification({
            position: "top-right",
            title: "Hola",
            text: `Bienvenido a Sanble, cuenta ha sido creada exitosamente`,
          });
        })
        .catch(({ errors }) => {
          this.$vs.notification(
            notificationList({
              list: errors,
              color: "danger",
            })
          );
        });
    },
  },
};
</script>

<style scoped>
.sb__auth-form {
  padding: 20px 40px;
  background-image: url("/img/wave4.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top right;
}
.sb__auth-form h1 div {
  width: 87px;
  height: 7px;
  border-radius: 20px;
  background-color: var(--sb-primary);
  position: absolute;
  bottom: 10px;
  left: 104px;
  z-index: 0;
}
</style>
