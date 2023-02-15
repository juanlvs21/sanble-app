import * as yup from "yup";

const lengthMax = 500;

export const photoSchema = yup.object({
  description: yup
    .string()
    .required("Ingrese una descripción")
    .max(lengthMax, `La descripción debe tener máximo ${lengthMax} caracteres`),
  image: yup.mixed().test("image", "Agregue una fotografía", function (value) {
    if (!value) return Boolean(this.parent.id);
    return true;
  }),
  isCover: yup.boolean(),
});
