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
import styles from "./ImageExtended.module.css";
import { fetchBlob } from "@/services";

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

export const ImageExtended = ({
  classNamePicture = "",
  skeletonProps = {},
  isLoading = false,
  ...props
}: ComponentProps) => {
  const [image, setImage] = useState("");
  const [isLoadingSrc, setIsLoadingSrc] = useState(false);

  const handleGetImage = async (url: string) => {
    try {
      setIsLoadingSrc(true);

      const blob = await fetchBlob(url);

      setImage(URL.createObjectURL(blob));
    } catch (error) {
      setImage(brokenImage);
    } finally {
      setIsLoadingSrc(false);
    }
  };

  useEffect(() => {
    if (!isLoading) handleGetImage(props?.src || defaultImage);
  }, [isLoading, props?.src]);

  return (
    <picture
      className={`${classNamePicture} ${styles.imagePicture} animate__animated animate__fadeIn`}
    >
      {image && (
        <img
          {...props}
          src={image}
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
