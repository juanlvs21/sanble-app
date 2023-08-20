import * as yup from "yup";

const lengthMax = 500;

export const postSchema = yup.object({
  text: yup
    .string()
    .required("Ingrese el texto de su publicación")
    .max(lengthMax, `El text debe tener máximo ${lengthMax} caracteres`),
});
