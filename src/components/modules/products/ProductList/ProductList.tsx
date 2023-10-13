import { BsThreeDotsVertical } from "react-icons/bs";

import { ImageExtended } from "@/components/common/ImageExtended";
import { Button } from "@/components/common/buttons/Button";
import { TProduct } from "@/types/TProduct";
import styles from "./ProductList.module.css";

export type ComponentProps = {
  /**
   * Product Details
   */
  product: TProduct;
  /**
   *  Handle delete product
   */
  handleActions: (product: TProduct) => void;
  /**
   * Custom className component
   */
  className?: string;
};

export const ProductList = ({
  product,
  handleActions,
  className = "",
}: ComponentProps) => (
  <article
    className={`animate__animated animate__fadeIn ${styles.productList} ${className}`}
  >
    <div className={styles.productListContent}>
      <h1>{product.name}</h1>
      <p className={styles.productListSlogan}>{product.description}</p>
    </div>
    <ImageExtended
      src={product.fileUrl}
      alt={product.name}
      classNamePicture={styles.productListPicture}
      className={styles.productListImg}
      skeletonProps={{
        className: styles.productListImg,
      }}
    />

    <Button
      onClick={() => handleActions(product)}
      fill="solid"
      color="dark"
      className={styles.productListBtnMenu}
    >
      <BsThreeDotsVertical size={18} />
    </Button>

    {/* {user?.uid !== product.owner.uid && ()} We should hide fav button if you are the owner */}
    <div className={styles.productListPrice}>
      {product.currency} {product.price}
    </div>
  </article>
);
