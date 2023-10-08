import { parsePhoneNumberFromString } from "libphonenumber-js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
        .required("Ingrese descripcion del stand")
        .max(
          lengthMaxLong,
          `El descripcion debe tener máximo ${lengthMaxLong} caracteres`
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
      slogan: yup
        .string()
        .max(
          lengthMaxLong,
          `El slogan debe tener máximo ${lengthMaxLong} caracteres`
        ),
    })
    .required()
);
