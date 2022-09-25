import { unknownErrorMsg } from "./constTexts";

type formatData422 = {
  value: string;
  msg: string;
  param: string;
  location: string;
};

const getStatusCode = (response: any) =>
  response.status || response.data?.statusCode;

export const errorsMessageAPI = (error: any) => {
  let messageArray: string[] = [];

  if (error?.response) {
    if (getStatusCode(error.response) == 422) {
      error.response.data?.errors.map((err: formatData422) => {
        messageArray.push(`<li>${err.msg}</li>`);
      });
    }
    if (getStatusCode(error.response) == 400) {
      if (error.response.data?.message) {
        messageArray.push(`<li>${error.response.data?.message}</li>`);
      }
    }
  }

  messageArray = messageArray
    .reverse()
    .filter((v, i, a) => a.map((e) => e).indexOf(v) === i);

  if (messageArray.length > 0) {
    return `<ul>${messageArray.join(" ")}</ul>`;
  } else {
    return unknownErrorMsg;
  }
};

export const errorsFirebase = (error: any) => {
  let message = unknownErrorMsg;

  if (
    error?.code === "auth/user-not-found" ||
    error?.code === "auth/wrong-password"
  ) {
    message = "Correo electrónico o contraseña incorrectos";
  }
  if (error?.code === "auth/invalid-email") {
    message = "Ingrese un correo electrónico válido";
  }

  return message;
};
