import * as yup from "yup";

const lengthMax = 500;

export const reviewSchema = yup.object({
  comment: yup
    .string()
    .required("Ingrese su comentario")
    .max(lengthMax, `El comentario debe tener máximo ${lengthMax} caracteres`),
  stars: yup.number().required("¿Cuántas estrellas das?"),
});
