// Utils
import formatMessageToasts from "../formatMessageToasts";

const API_URL = process.env.REACT_APP_URL_API;

// Auth
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
