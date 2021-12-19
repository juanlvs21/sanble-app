import { noImage } from "@/helpers/imagesDefault";
import { TFairPhotograph } from "@/types/Fairs";

export const getFairCover = (photograph: TFairPhotograph[] = []): string => {
  let cover = noImage;
  photograph.map((photo) => {
    if (photo.cover) cover = photo.url_photo;
  });

  return cover;
};
