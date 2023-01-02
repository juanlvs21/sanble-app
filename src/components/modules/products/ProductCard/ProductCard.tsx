import { Link } from "react-router-dom";

import { ImageExtended } from "@/components/common/ImageExtended";
import { TProductType } from "@/types/TProduct";
import styles from "./ProductCard.module.css";

export type ComponentProps = {
  /**
   * Product type Details
   */
  productType: TProductType;
};

export const ProductCarouselCard: React.FC<ComponentProps> = ({
  productType,
}) => {
  return (
    <Link
      to={`/app/productos/${productType.id}`}
      state={{
        productTypeID: productType.id,
        productTypeName: productType.name,
      }}
      className={styles.productTypeCardLink}
    >
      <article
        className={`${styles.productTypeCard} animate__animated animate__fadeIn`}
      >
        <ImageExtended
          src={`/assets/images/products/${productType.key}.png`}
          alt={productType.name}
          className={styles.productTypeCardImg}
          skeletonProps={{
            className: styles.productTypeCardImg,
          }}
        />
        <h1>{productType.name}</h1>
      </article>
    </Link>
  );
};
