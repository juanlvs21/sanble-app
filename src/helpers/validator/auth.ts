import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  TAuthSigInForm,
  TAuthSignupForm,
  TChangePassword,
  TRecoverPassword,
} from "@/types/TUser";

const passMin = 8;
const lengthMax = 40;

export const signUpSchema = yupResolver<TAuthSignupForm>(
  yup
    .object()
    .shape({
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
        .max(
          lengthMax,
          `La contraseña debe tener máximo ${lengthMax} caracteres`
        ),
    })
    .required()
);

export const signInSchema = yupResolver<TAuthSigInForm>(
  yup
    .object()
    .shape({
      email: yup
        .string()
        .email("Ingrese un correo el electrónico válido")
        .required("Ingrese su correo electrónico"),
      password: yup.string().required("Ingrese su contraseña"),
    })
    .required()
);

export const changePasswordSchema = yupResolver<TChangePassword>(
  yup
    .object()
    .shape({
      password: yup
        .string()
        .required("Ingrese su contraseña")
        .min(passMin, `La contraseña debe tener mínimo ${passMin}`)
        .max(
          lengthMax,
          `La contraseña debe tener máximo ${lengthMax} caracteres`
        ),
      confirmPassword: yup
        .string()
        .test(
          "matchPass",
          "Contraseña no coincide",
          (value, { parent, createError }) => {
            if (value !== parent.password) return createError();

            return true;
          }
        ),
    })
    .required()
);

export const recoveryPasswordSchema = yupResolver<TRecoverPassword>(
  yup
    .object()
    .shape({
      email: yup
        .string()
        .required("Ingrese su correo electrónico")
        .email("Ingrese un correo el electrónico válido"),
    })
    .required()
);
