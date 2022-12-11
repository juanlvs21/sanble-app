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
};

export const Image: React.FC<ComponentProps> = ({
  classNamePicture = "",
  skeletonProps = {},
  ...props
}) => {
  const [imageUrl, setImageUrl] = useState(defaultImage);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.src) setImageUrl(props.src);
  }, []);

  return (
    <picture
      className={`${classNamePicture} ${styles.imagePicture} animate__animated animate__fadeIn`}
    >
      <img
        {...props}
        src={imageUrl}
        loading={props.loading || "lazy"}
        onLoad={() => setIsLoading(false)}
        onError={() => setImageUrl(brokenImage)}
        className={`${props.className} ${styles.imageTag} ${
          isLoading ? styles.imageIsLoading : ""
        } animate__animated animate__fadeIn`}
      />

      {isLoading && (
        <Skeleton
          {...skeletonProps}
          className={`${styles.imageSkeleton} ${skeletonProps?.className} animate__animated animate__fadeIn`}
        />
      )}
    </picture>
  );
};
