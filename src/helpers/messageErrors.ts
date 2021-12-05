export const messageErrors = (errors: any): string[] => {
  const code = errors?.response?.code;
  let messages: string[] = [];

  if (code === 422) {
    messages = errors.response.data;
  } else {
    messages = ["Error desconocído"];
  }

  return messages;
};
