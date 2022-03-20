export enum EFairType {
  ENTREPRENEURSHIP = "ENTREPRENEURSHIP",
  GASTRONOMIC = "GASTRONOMIC",
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
  id: string;
  name: string;
  description: string;
  emailContact?: string;
  phoneContact?: string;
  type: TFairType;
  typeFriendly?: string;
  stars: number;
  dateTime?: string;
  lat?: string;
  lng?: string;
  address: string;
  photoUrl: string;
  photographs: TFairPhotograph[];
  createdAt: string;
  userId: string;
};
