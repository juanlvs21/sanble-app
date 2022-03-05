export enum EFairType {
  ENTREPRENEURSHIP = "entrepreneurship",
  GASTRONOMIC = "gastronomic",
}

export type TFairType = EFairType.ENTREPRENEURSHIP | EFairType.GASTRONOMIC;

// export type TFairDate = {
//   date?: string;
//   type?: "daily" | "weekly" | "monthly" | "annual";
// };

export type TFairPhotograph = {
  uuid: string;
  url_photo: string;
  cover?: boolean;
  creationTime: string;
  description?: string;
};

export type TFair = {
  uuid: string;
  name: string;
  description: string;
  uuid_user: string;
  type: TFairType;
  typeFriendly?: string;
  stars: number;
  email?: string;
  phone?: string;
  // fair_date?: TFairDate;
  date_time?: number;
  lat?: string;
  lng?: string;
  address?: string;
  photographs?: TFairPhotograph[];
  creationTime?: string;
};
