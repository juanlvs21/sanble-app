export const formikError = (
  error?: string,
  touched?: boolean
): { show: boolean; msg: string } => {
  return {
    show: !!error && !!touched,
    msg: error && touched ? error : "",
  };
};
