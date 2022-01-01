import {noImage, noAvatar} from '@/helpers/imagesDefault';

export const getImage = (
  image: string | null | undefined,
  avatar?: boolean,
) => {
  const defaultImage = avatar ? noAvatar : noImage;
  return image ? {uri: image} : defaultImage;
};
