import { EFairType, TFair } from "@/types/TFairs";
import { TStand } from "@/types/TStands";

export const mockFair: TFair = {
  id: "",
  photographs: [],
  photoUrl: "",
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
  photoUrl: "",
  promotions: [],
  stars: 0,
  userId: "",
  createdAt: "",
};
