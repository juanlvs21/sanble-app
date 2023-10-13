import { TProductForm } from "@/types/TProduct";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const lengthMaxLong = 500;
const lengthMaxShort = 40;

export const productSchema = yupResolver<TProductForm>(
  yup
    .object()
    .shape({
      name: yup
        .string()
        .required("Ingrese el nombre del producto")
        .max(
          lengthMaxShort,
          `El nombre del producto debe tener máximo ${lengthMaxShort} caracteres`
        ),
      description: yup
        .string()
        .required("Ingrese la descripción del producto")
        .max(
          lengthMaxLong,
          `La descripción del producto debe tener máximo ${lengthMaxLong} caracteres`
        ),
      price: yup
        .mixed()
        .test(
          "image",
          "El precio debe ser mayor a 0.00 y menor a 999,999.99",
          function (value) {
            if (!value) return false;

            const amountWithoutDecimals = value.split(".")[0];

            if (amountWithoutDecimals.length > 7) return false;

            return true;
          }
        ),
      type: yup.string().required("Seleccione el tipo del producto"),
      image: yup
        .mixed()
        .test("image", "Agregue una imagen del producto", function (value) {
          if (!value) return Boolean(this.parent.id);
          return true;
        }),
    })
    .required()
);
