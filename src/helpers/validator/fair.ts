import { yupResolver } from "@hookform/resolvers/yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
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
        .required("Ingrese un teléfono de contacto"),
      contactPhone: yup
        .string()
        .required("Ingrese un teléfono de contacto")
        .transform((value) =>
          (parsePhoneNumberFromString(value, "VE")?.nationalNumber
            ? parsePhoneNumberFromString(value, "VE")?.nationalNumber
            : value
          ).slice(0, 10)
        )
        .test(
          "valid-phone-ve",
          "Ingrese un teléfono válido para Venezuela",
          (value = "") => {
            const parsedNumber = parsePhoneNumberFromString(value, "VE");

            if (!Boolean(parsedNumber)) return false;
            else {
              return prefixPhoneVE.includes(
                (parsedNumber?.nationalNumber || "").slice(0, 3)
              );
            }
          }
        )
        .min(lengthMaxPhone, `El teléfono debe tener ${lengthMaxPhone} digitos`)
        .max(
          lengthMaxPhone,
          `El teléfono debe tener ${lengthMaxPhone} digitos`
        ),
      celebrationDate: yup
        .date()
        .nullable()
        .default(() => new Date()),
      address: yup
        .string()
        .required("Ingrese la dirección de la feria")
        .max(
          lengthMaxLong,
          `La dirección debe tener máximo ${lengthMaxLong} caracteres`
        ),
    })
    .required()
);
