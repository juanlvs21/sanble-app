import { OrderByDirection } from "firebase/firestore";

export type TGetListParams = {
  page?: number;
  perPage?: number;
  orderBy?: string;
  orderDir?: OrderByDirection;
};
