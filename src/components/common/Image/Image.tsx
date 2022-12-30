import {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useEffect,
  useState,
} from "react";

import {
  ComponentProps as SkeletonProps,
  Skeleton,
} from "@/components/common/Skeleton";
import { brokenImage, defaultImage } from "@/helpers/defaultImage";
import styles from "./Image.module.css";

export type ComponentProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  /**
   * Custom className for container component (Picture tag)
   */
  classNamePicture?: string;
  /**
   * Skeleton props
   */
  skeletonProps?: SkeletonProps;
  /**
   * Component Loading
   */
  isLoading?: boolean;
};

export const ImageExtended: React.FC<ComponentProps> = ({
  classNamePicture = "",
  skeletonProps = {},
  isLoading = false,
  ...props
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoadingSrc, setIsLoadingSrc] = useState(true);

  useEffect(() => {
    if (!isLoading) handleGetImage();
  }, [isLoading]);

  const handleGetImage = async () => {
    setIsLoadingSrc(true);

    const downloadingImage = new Image();

    downloadingImage.onload = function (this: any) {
      if (this?.src) setImageUrl(this.src);
    };

    downloadingImage.onerror = function () {
      setImageUrl(brokenImage);
    };

    downloadingImage.src = props?.src || defaultImage;
  };

  return (
    <picture
      className={`${classNamePicture} ${styles.imagePicture} animate__animated animate__fadeIn`}
    >
      {imageUrl && (
        <img
          {...props}
          src={imageUrl}
          loading={props.loading || "lazy"}
          onLoad={() => setIsLoadingSrc(false)}
          className={`${props.className} ${styles.imageTag} ${
            isLoadingSrc ? styles.imageIsLoading : ""
          } animate__animated animate__fadeIn`}
        />
      )}

      {(isLoading || isLoadingSrc) && (
        <Skeleton
          {...skeletonProps}
          className={`${styles.imageSkeleton} ${skeletonProps?.className} animate__animated animate__fadeIn`}
        />
      )}
    </picture>
  );
};
