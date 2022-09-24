import { FormikErrors, FormikTouched } from "formik";

export const getErrorMessage = (
  field: string,
  touched: FormikTouched<any>,
  errors: FormikErrors<any>
): string => {
  const touchedField = touched[field];
  const errorField = errors[field] ? `${errors[field]}` : "";

  return touchedField && errorField ? errorField : "";
};
