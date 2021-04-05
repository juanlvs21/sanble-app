import { TEntrepreneurship, TGastronomic } from "../interfaces/IFairs";

const translate = {
  entrepreneurship: "Emprendimiento",
  gastronomic: "Gastronómica",
};

export const fairTypeSpanish: (
  type: TEntrepreneurship | TGastronomic
) => string = (type: TEntrepreneurship | TGastronomic) => translate[type];
