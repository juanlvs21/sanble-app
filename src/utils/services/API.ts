import { promises } from "dns";

const API_URL = process.env.REACT_APP_URL_API;

// Auth
export const login: any = async (body: any): Promise<any> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body,
  });

  return response.json();
};

export const register: any = async (body: any): Promise<any> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    body,
  });

  return response.json();
};
