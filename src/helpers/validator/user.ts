import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { prefixPhoneVE } from "@/helpers/prefixPhoneVE";
import { TUpdateUser } from "@/types/TUser";

const lengthMax = 40;
const lengthMaxPhone = 10;

export const userSchema = yupResolver<TUpdateUser>(
  yup
    .object()
    .shape({
      displayName: yup
        .string()
        .required("Ingrese su nombre")
        .max(lengthMax, `El nombre debe tener máximo ${lengthMax} caracteres`)
        .matches(
          /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
          "El nombre solo debe contener letras"
        ),
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
        .transform((value) => {
          if (!value) return value;
          let phone = value.replace("+58", "");

          return phone;
        })
        .matches(/^\+?[0-9]*$/, "Formato inválido, solo se permiten números.")
        .test(
          "valid-prefix",
          "Ingrese un teléfono válido para Venezuela (412, 414, 416, 424, 426, 422, 295, etc.)",
          (value) => {
            if (!value) return true;

            const prefix = value.substring(0, 3);
            return prefixPhoneVE.includes(prefix);
          }
        )
        .test(
          "valid-length",
          `El teléfono debe tener ${lengthMaxPhone} dígitos`,
          (value) => {
            if (!value) return true;

            return value.length === lengthMaxPhone;
          }
        ),
    })
    .required()
);
