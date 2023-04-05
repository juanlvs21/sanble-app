import * as yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import { EFairType } from "@/types/TFair";

const lengthMaxLong = 500;
const lengthMaxShort = 40;
const lengthMaxPhone = 10;

export const newFairSchema = yup.object({
  name: yup
    .string()
    .required("Ingrese nombre de la feria")
    .max(
      lengthMaxShort,
      `El nombre debe tener máximo ${lengthMaxShort} caracteres`
    ),
  description: yup
    .string()
    .required("Ingrese descripcion de la feria")
    .max(
      lengthMaxLong,
      `El descripcion debe tener máximo ${lengthMaxLong} caracteres`
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
    ),
  contactPhone: yup
    .string()
    .required("Ingrese un teléfono de contacto")
    .transform((value) =>
      parsePhoneNumberFromString(value, "VE")?.nationalNumber
        ? parsePhoneNumberFromString(value, "VE")?.nationalNumber
        : value
    )
    .min(lengthMaxPhone, `El teléfono debe tener ${lengthMaxPhone} digitos`)
    .max(lengthMaxPhone, `El teléfono debe tener ${lengthMaxPhone} digitos`),
  celebrationDate: yup.date().default(() => new Date()),
  address: yup
    .string()
    .required("Ingrese la dirección de la feria")
    .max(
      lengthMaxLong,
      `La dirección debe tener máximo ${lengthMaxLong} caracteres`
    ),
});
