import dayjs from "dayjs";

import { EFairCelebrationType, TFair } from "@/types/TFair";

const dayName: Record<number, string> = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  7: "Domingo",
};

export const getCelebrationFair = (fair?: TFair) => {
  if (!fair) return undefined;

  let celebration = undefined;

  if (
    fair.celebrationType === EFairCelebrationType.WEEKLY &&
    fair.celebrationWeeklyDay
  ) {
    celebration = `Todos los ${dayName[fair.celebrationWeeklyDay]}`;
  }

  if (
    fair.celebrationType === EFairCelebrationType.MONTHLY &&
    fair.celebrationMonthlyDay
  ) {
    celebration = `El ${fair.celebrationMonthlyDay} de cada mes`;
  }

  if (
    fair.celebrationType === EFairCelebrationType.SPECIFIC_DATE &&
    fair.celebrationDate
  ) {
    celebration = dayjs(fair.celebrationDate).format("dddd, DD MMM");
    celebration = celebration.charAt(0).toUpperCase() + celebration.slice(1);
  }

  return celebration;
};
