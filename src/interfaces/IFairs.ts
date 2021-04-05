export default interface IFairs {
  uuid: string;
  name: string;
  address: string;
  approved: boolean;
  description: string;
  email: string;
  phone: string;
  lat?: string;
  lng?: string;
  fair_date?: FairDate;
  photographs: Array<Photograph>;
  stars: number;
  type: TFairType;
  creationTime: string;
  uuid_user: string;
}

export type TEntrepreneurship = "entrepreneurship";
export type TGastronomic = "gastronomic";
export type TFairType = TEntrepreneurship | TGastronomic;

export interface FairDate {
  date?: string;
  type?: "daily" | "weekly" | "monthly" | "annual";
}

export interface Photograph {
  uuid: string;
  url_photo: string;
  cover: boolean;
  creationTime: string;
  description?: string;
}
