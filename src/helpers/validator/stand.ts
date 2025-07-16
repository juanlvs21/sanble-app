import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { prefixPhoneVE } from "@/helpers/prefixPhoneVE";
import { TStandForm } from "@/types/TStand";

const lengthMaxLong = 500;
const lengthMaxShort = 40;
const lengthMaxPhone = 10;

export const standSchema = yupResolver<TStandForm>(
  yup
    .object()
    .shape({
      name: yup
        .string()
        .required("Ingrese nombre del stand")
        .max(
          lengthMaxShort,
          `El nombre debe tener máximo ${lengthMaxShort} caracteres`
        ),
      description: yup
        .string()
        .required("Ingrese descripción del stand")
        .max(
          lengthMaxLong,
          `El descripción debe tener máximo ${lengthMaxLong} caracteres`
        ),
      contactEmail: yup
        .string()
        .email("Ingrese un correo el electrónico válido")
        .max(
          lengthMaxShort,
          `El correo electrónico debe tener máximo ${lengthMaxShort} caracteres`
        )
        .required("Ingrese un correo electrónico de contacto"),
      contactPhone: yup
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
      slogan: yup
        .string()
        .max(
          lengthMaxLong,
          `El slogan debe tener máximo ${lengthMaxLong} caracteres`
        ),
    })
    .required()
);
