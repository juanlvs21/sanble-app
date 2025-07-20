import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { prefixPhoneVE } from "@/helpers/prefixPhoneVE";
import { EFairType, TFairForm } from "@/types/TFair";

const lengthMaxLong = 500;
const lengthMaxShort = 40;
const lengthMaxPhone = 10;

export const fairSchema = yupResolver<TFairForm>(
  yup
    .object()
    .shape({
      name: yup
        .string()
        .required("Ingrese nombre de la feria")
        .max(
          lengthMaxShort,
          `El nombre debe tener máximo ${lengthMaxShort} caracteres`
        ),
      description: yup
        .string()
        .required("Ingrese descripción de la feria")
        .max(
          lengthMaxLong,
          `El descripción debe tener máximo ${lengthMaxLong} caracteres`
        ),
      type: yup
        .string()
        .required("Ingrese el tipo la feria")
        .test(
          "valid-type",
          "El tipo debe ser Emprendimiento o Gastronómica",
          (value: any = "") =>
            [EFairType.ENTREPRENEURSHIP, EFairType.GASTRONOMIC].includes(value)
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
      address: yup
        .string()
        .required("Ingrese la dirección de la feria")
        .max(
          lengthMaxLong,
          `La dirección debe tener máximo ${lengthMaxLong} caracteres`
        ),
      // celebrationType: yup.string().nullable().optional(),
      // celebrationDate: yup.date().nullable().optional(),
      // celebrationWeeklyDay: yup.number().nullable().optional(),
      // celebrationMonthlyDay: yup.number().nullable().optional(),
    })
    .required()
);
