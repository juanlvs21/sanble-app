export type TPhotographBase = {
  id: string;
  url: string;
  name: string;
  image: string;
  description: string;
  creationTime: string;
  isCover: boolean;
};

export type TPhotograph = Omit<TPhotographBase, "image">;

export type TPhotographForm = Omit<
  TPhotographBase,
  "creationTime" | "name" | "url"
>;

export type TPhotographDetails = { photograph: TPhotograph; ownerID: string };
