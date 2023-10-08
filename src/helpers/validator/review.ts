import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { TReviewForm } from "@/types/TReview";
const lengthMax = 500;

export const reviewSchema = yupResolver<TReviewForm>(
  yup
    .object()
    .shape({
      comment: yup
        .string()
        .required("Ingrese su comentario")
        .max(
          lengthMax,
          `El comentario debe tener máximo ${lengthMax} caracteres`
        ),
      stars: yup.number().required("¿Cuántas estrellas das?"),
    })
    .required()
);
