import { OrderByDirection } from "firebase/firestore";

export type TGetListParams = {
  orderBy?: string;
  orderDir?: OrderByDirection;
  total?: number;
  lastIndex?: number;
  limit?: number;
};
