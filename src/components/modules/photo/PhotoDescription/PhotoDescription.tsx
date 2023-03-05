import { BsFillBookmarkStarFill } from "react-icons/bs";

import { ImageExtended } from "@/components/common/ImageExtended";
import { SpinnerFullScreen } from "@/components/common/loaders/SpinnerFullScreen";
import { dayjs } from "@/helpers/time";
import { TPhotograph } from "@/types/TPhotograph";
import styles from "./PhotoDescription.module.css";

export type ComponentProps = {
  /**
   * photographs list
   */
  photo?: TPhotograph;
  /**
   * Show or not the description of the photograph
   */
  showDescription?: boolean;
  /**
   * Callback function when clicking on the photo
   */
  onClick?: () => void;
  /**
   * Text that is displayed when the photo is isCover: true
   *
   * @default "Fotografía Destacada"
   */
  isCoverText?: string;
  /**
   * Component Loading
   */
  isLoading?: boolean;
  /**
   * Custom className container
   */
  classNameContainer?: string;
  /**
   * Custom className picture
   */
  classNamePicture?: string;
  /**
   * Custom className img
   */
  classNameImg?: string;
  /**
   * Custom className description
   */
  classNameDescription?: string;
};

export const PhotoDescription = ({
  photo,
  showDescription,
  onClick,
  isLoading,
  isCoverText = "Fotografía Destacada",
  classNameDescription = "",
  classNameContainer = "",
  classNamePicture = "",
  classNameImg = "",
}: ComponentProps) => (
  <div
    onClick={!isLoading ? onClick : undefined}
    className={`${styles.photoContainer} ${classNameContainer} animate__animated animate__fadeIn`}
  >
    <div
      style={{ backgroundImage: `url(${photo?.url})` }}
      className={`${styles.photoBackground}`}
    />

    <ImageExtended
      src={photo?.url ?? ""}
      alt={photo?.id ?? ""}
      classNamePicture={`${styles.photoPicture} ${classNamePicture}`}
      className={`${styles.photoImage} ${classNameImg}`}
      skeletonProps={{
        className: `${styles.photoImage} ${classNameImg}`,
      }}
      isLoading={isLoading}
    />
    {photo?.isCover && (
      <div
        className={`${styles.photoDescriptionCover} ${
          showDescription ? styles.show : ""
        }`}
      >
        <p>
          {isCoverText}
          <BsFillBookmarkStarFill size={20} />
        </p>
      </div>
    )}
    {photo && (
      <div
        className={`${styles.photoDescription} ${
          showDescription ? styles.show : ""
        } ${classNameDescription}`}
      >
        <p>{photo.description}</p>
        <small>{dayjs(photo.creationTime).format("DD MMM hh:mm a")}</small>
      </div>
    )}
    <SpinnerFullScreen show={Boolean(isLoading)} />
  </div>
);
