import * as yup from "yup";

const passMin = 8;
const lengthMax = 40;

export const signUpSchema = yup.object({
  name: yup
    .string()
    .required("Ingrese su nombre")
    .max(lengthMax, `El nombre debe tener máximo ${lengthMax} caracteres`),
  email: yup
    .string()
    .required("Ingrese su correo electrónico")
    .email("Ingrese un correo el electrónico válido")
    .max(
      lengthMax,
      `El correo electrónico debe tener máximo ${lengthMax} caracteres`
    ),
  password: yup
    .string()
    .required("Ingrese su contraseña")
    .min(passMin, `La contraseña debe tener mínimo ${passMin}`)
    .max(lengthMax, `La contraseña debe tener máximo ${lengthMax} caracteres`),
});

export const signInSchema = yup.object({
  email: yup
    .string()
    .required("Ingrese su correo electrónico")
    .email("Ingrese un correo el electrónico válido"),
  password: yup.string().required("Ingrese su contraseña"),
});

export const recoveryPasswordSchema = yup.object({
  email: yup
    .string()
    .required("Ingrese su correo electrónico")
    .email("Ingrese un correo el electrónico válido"),
});
