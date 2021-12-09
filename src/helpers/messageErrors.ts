export const messageErrors = (errors: any): string[] => {
  const codeCode = errors?.response?.status;
  let messages: string[] = [];

  if (codeCode === 422) {
    messages = errors.response.data.data;
  } else {
    messages = ["Error desconocído"];
  }

  return messages;
};
