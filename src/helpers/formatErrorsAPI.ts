type formatData422 = {
  value: string;
  msg: string;
  param: string;
  location: string;
};

const getStatusCode = (response: any) =>
  response.status || response.data?.statusCode;

export const errorsMessage = (error: any) => {
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

  return `<ul>${messageArray.join(" ")}</ul>`;
};
