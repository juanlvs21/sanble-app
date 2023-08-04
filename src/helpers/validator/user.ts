import * as yup from "yup";

const passMin = 8;
const lengthMax = 40;

export const userSchema = yup.object({
  displayName: yup
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
  phoneNumber: yup
    .string()
    .min(passMin, `La contraseña debe tener mínimo ${passMin}`)
    .max(lengthMax, `La contraseña debe tener máximo ${lengthMax} caracteres`),
});
