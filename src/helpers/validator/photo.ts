import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { TPhotographForm } from "@/types/TPhotograph";

const lengthMax = 500;

export const photoSchema = yupResolver<TPhotographForm>(
  yup
    .object()
    .shape({
      description: yup
        .string()
        .max(
          lengthMax,
          `La descripción debe tener máximo ${lengthMax} caracteres`
        ),
      image: yup
        .mixed()
        .test("image", "Agregue una fotografía", function (value) {
          if (!value) return Boolean(this.parent.id);
          return true;
        }),
      isCover: yup.boolean(),
    })
    .required()
);
