import { Link } from "react-router-dom";

import { ImageExtended } from "@/components/common/ImageExtended";
import { getProductTypeNameByKey } from "@/helpers/productTypes";
import { TProduct } from "@/types/TProduct";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./ProductCardRecent.module.css";

export type ComponentProps = {
  /**
   * Product Details
   */
  product: TProduct;
  onSelect?: (product: TProduct) => void;
};

export const ProductCardRecent = ({ product, onSelect }: ComponentProps) => {
  return (
    <article
      className={styles.productRecentCard}
      onClick={() => onSelect?.(product)}
    >
      <ImageExtended
        src={product.fileUrl}
        alt={product.name}
        classNamePicture={styles.productRecentCover}
        className={styles.productRecentCoverImg}
        skeletonProps={{
          className: styles.productRecentCoverImg,
        }}
      />

      <div className={styles.productRecentContent}>
        <h1>{product.name}</h1>
        <p>
          <b>Categoría:</b> {getProductTypeNameByKey(product.type)}
        </p>

        {product.stand && (
          <p>
            <b>Stand:</b> {product.stand?.name}
          </p>
        )}

        <div className={styles.productRecentPrice}>
          {product.currency} {product.price}
        </div>
      </div>
    </article>
  );
};
