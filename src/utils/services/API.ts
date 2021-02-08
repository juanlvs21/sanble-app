// Utils
import formatMessageToasts from "../formatMessageToasts";

const API_URL = process.env.REACT_APP_URL_API;

// Auth
export const login: any = (body: any): Promise<Response> => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      const { data } = await response.json();

      if (!response.ok) {
        reject(formatMessageToasts(data));
      } else resolve(data);
    } catch (error) {
      console.log(error);
      reject("Error desconocido");
    }
  });
};
export const register: any = (body: any): Promise<Response> => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      const { data } = await response.json();

      if (!response.ok) {
        reject(formatMessageToasts(data));
      } else resolve(data);
    } catch (error) {
      console.log(error);
      reject("Error desconocido");
    }
  });
};
export const checkSession: any = (token: string): Promise<Response> => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/auth/check`, {
        method: "POST",
        headers: new Headers({
          Authorization: token,
        }),
      });

      const { data } = await response.json();
      if (!response.ok) {
        reject(formatMessageToasts(data));
      } else resolve(data);
    } catch (error) {
      console.log(error);
      reject("Error desconocido");
    }
  });
};
