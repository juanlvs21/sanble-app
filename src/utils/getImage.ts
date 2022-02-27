const noAvatar = "/assets/images/avatar.png";
const noImage = "/assets/images/no-image.png";

export const getImage = (
  image: string | null | undefined,
  avatar?: boolean
) => {
  const defaultImage = avatar ? noAvatar : noImage;
  return image || defaultImage;
};
