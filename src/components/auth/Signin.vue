<template>
  <div class="sb__auth-form">
    <h1>
      <span>Ingresar</span>
      <div />
    </h1>
    <h3>Ingresa en la Plataforma de Sanble</h3>
    <form @submit.prevent="onSubmit">
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
    <router-link :to="{ name: 'recover-password' }" class="recover-password">
      Recuperar Contraseña
    </router-link>
  </div>
</template>

<script>
import * as yup from "yup";

import { notificationList } from "@/helpers/notifications";

export default {
  name: "Signin",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      schema: yup.object().shape({
        email: yup
          .string()
          .required("El correo electrónico es obligatorio")
          .email("Ingrese un correo electrónico válido"),
        password: yup.string().required("La contraseña es obligatoria"),
      }),
    };
  },
  methods: {
    onSubmit() {
      this.schema
        .validate(this.user)
        .then(() => {
          this.$vs.notification({
            position: "top-right",
            title: "Hola",
            text: `Bienvenido a Sanble, su sesion ha sido iniciada`,
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
  background-image: url("/img/wave3.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top right;
}
.sb__auth-form h1 div {
  width: 100px;
  height: 7px;
  border-radius: 20px;
  background-color: var(--sb-primary);
  position: absolute;
  bottom: 10px;
  left: 7px;
  z-index: 0;
}
.sb__auth-form .recover-password {
  display: block;
  text-align: center;
  margin-top: 30px;
}
</style>
