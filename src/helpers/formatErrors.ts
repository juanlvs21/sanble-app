import { unknownErrorMsg } from "./constTexts";

type formatData422 = {
  value: string;
  msg: string;
  param: string;
  location: string;
};

export const getStatusCode = (response: any) =>
  response.status || response.data?.statusCode;

export const errorsMessage = (errors: any) => {
  let messageArray: string[] = [];

  if (errors?.response) {
    if (getStatusCode(errors.response) == 422) {
      errors.response.data?.errors.map((err: formatData422) => {
        messageArray.push(err.msg);
      });
    }
    if (getStatusCode(errors.response) == 400) {
      if (errors.response.data?.message) {
        messageArray.push(errors.response.data?.message);
      }
    }
  }

  if (
    errors?.code === "auth/user-not-found" ||
    errors?.code === "auth/wrong-password"
  ) {
    messageArray.push("Correo electrónico o contraseña incorrectos");
  }
  if (errors?.code === "auth/invalid-email") {
    messageArray.push("Ingrese un correo electrónico válido");
  }
  if (errors?.code === "auth/popup-closed-by-user") {
    messageArray.push("La ventana emergente de autenticación fue cerrada");
  }

  return messageArray;
};