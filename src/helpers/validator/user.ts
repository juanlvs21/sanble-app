import { yupResolver } from "@hookform/resolvers/yup";
import parsePhoneNumberFromString from "libphonenumber-js";
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
            if (!value) return true;

            const parsedNumber = parsePhoneNumberFromString(value, "VE");

            if (!Boolean(parsedNumber)) return false;
            else {
              return prefixPhoneVE.includes(
                (parsedNumber?.nationalNumber || "").slice(0, 3)
              );
            }
          }
        )
        .max(
          lengthMaxPhone,
          `El teléfono debe tener ${lengthMaxPhone} digitos`
        ),
    })
    .required()
);
