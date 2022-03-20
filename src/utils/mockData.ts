import { EFairType, TFair } from "@/types/TFairs";
import { TStand } from "@/types/TStands";

export const mockFair: TFair = {
  id: "",
  photographs: [],
  address: "",
  name: "",
  description: "",
  dateTime: "",
  stars: 0,
  userId: "",
  type: EFairType.ENTREPRENEURSHIP,
  createdAt: "",
};

export const mockStand: TStand = {
  id: "",
  name: "",
  description: "",
  products: [],
  promotions: [],
  stars: 0,
  userId: "",
  createdAt: "",
};
