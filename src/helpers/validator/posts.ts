import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { TPostForm } from "@/types/TPost";

const lengthMax = 500;

export const postSchema = yupResolver<TPostForm>(
  yup
    .object()
    .shape({
      text: yup
        .string()
        .required("Ingrese el texto de su publicación")
        .max(lengthMax, `El text debe tener máximo ${lengthMax} caracteres`),
    })
    .required()
);
