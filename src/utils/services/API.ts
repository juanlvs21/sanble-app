import axios from "axios";

// Utils
import formatMessageToasts from "../formatMessageToasts";

axios.defaults.baseURL = process.env.REACT_APP_URL_API;

// Catch
const errorsCatch = (errors: any) => {
  if (errors.response) return errors.response.data.data;
  else return ["Error desconocido"];
};

// Auth
export const login: any = (body: any): Promise<any> => {
  return new Promise<any>(async (resolve, rejects) => {
    await axios
      .post(`/auth/login`, body)
      .then(({ data: { data } }) => resolve(data))
      .catch((errors) => rejects(formatMessageToasts(errorsCatch(errors))));
  });
};

export const register: any = (body: any): Promise<Response> => {
  return new Promise<any>(async (resolve, reject) => {
    const response = await fetch(`/auth/register`, {
      method: "POST",
      body,
    });
    const { data } = await response.json();

    if (!response.ok) {
      reject(formatMessageToasts(data));
    } else resolve(data);
  });
};
