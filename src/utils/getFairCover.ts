import { TFairPhotograph } from "@/types/TFairs";

const noImage = "/assets/images/no-image.png";

export const getFairCover = (photograph: TFairPhotograph[] = []) => {
  let cover = noImage;

  photograph.map((photo) => {
    if (photo.cover) {
      cover = photo.url_photo;
    }

    return photo.url_photo;
  });

  return cover;
};
