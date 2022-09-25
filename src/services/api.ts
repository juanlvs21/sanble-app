import axios from "axios";

import { API_URL } from "@/helpers/config/env";

export const api = axios.create({
  baseURL: API_URL,
});
