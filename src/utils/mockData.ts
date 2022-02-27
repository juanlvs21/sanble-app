import { EFairType, TFair } from "@/types/TFairs";
import { TStand } from "@/types/TStands";

export const mockFair: TFair = {
  uuid: "",
  photographs: [],
  name: "",
  description: "",
  date_time: 0,
  stars: 0,
  uuid_user: "",
  type: EFairType.ENTREPRENEURSHIP,
};

export const mockStand: TStand = {
  uuid: "",
  name: "",
  description: "",
  products: [],
  promotions: [],
  stars: 0,
  uuid_user: "",
};
