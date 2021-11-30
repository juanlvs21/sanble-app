import * as Yup from "yup";

export const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Correo electrónico inválido")
    .required("Correo electrónico obligatio"),
  password: Yup.string().trim().required("Contraseña obligatoria"),
});

export const SignupSchema = Yup.object().shape({
  name: Yup.string().trim().required("Nombre obligatoria"),
  email: Yup.string()
    .trim()
    .email("Correo electrónico inválido")
    .required("Correo electrónico obligatio"),
  password: Yup.string().trim().required("Contraseña obligatoria"),
});
