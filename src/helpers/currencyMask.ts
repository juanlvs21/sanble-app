import { maskitoNumberOptionsGenerator } from "@maskito/kit";

export const currencyMask = maskitoNumberOptionsGenerator({
  decimalZeroPadding: true,
  precision: 2,
  decimalSeparator: ".",
  thousandSeparator: ",",
  min: 0,
});
