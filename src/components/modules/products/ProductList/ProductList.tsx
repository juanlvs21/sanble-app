import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { ImageExtended } from "@/components/common/ImageExtended";
import { Button } from "@/components/common/buttons/Button";
import { getProductTypeNameByKey } from "@/helpers/productTypes";
import { TProduct } from "@/types/TProduct";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./ProductList.module.css";

export type ComponentProps = {
  /**
   * Product Details
   */
  product: TProduct;
  /**
   *  Handle delete product
   */
  handleActions?: (product: TProduct) => void;
  /**
   * Custom className component
   */
  className?: string;
};

export const ProductList = ({
  product,
  handleActions,
  className = "",
}: ComponentProps) => {
  const navigate = useNavigate();

  return (
    <article
      className={`animate__animated animate__fadeIn ${styles.productList} ${
        product?.stand ? styles.productListWidthStand : ""
      } ${className}`}
    >
      <div className={styles.productListContent}>
        <h1>{product.name}</h1>
        <p className={styles.productListDescription}>{product.description}</p>
        <p className={styles.productListText}>
          <b>Categoría:</b> {getProductTypeNameByKey(product.type)}
        </p>
        {product.stand && (
          <p className={styles.productListText}>
            <b>Stand:</b> {product.stand?.name}
          </p>
        )}
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

      {handleActions && (
        <Button
          onClick={() => handleActions(product)}
          fill="solid"
          color="dark"
          className={styles.productListBtnMenu}
        >
          <BsThreeDotsVertical size={18} />
        </Button>
      )}

      <div className={styles.productListFooter}>
        <div className={styles.productListPrice}>
          {product.currency} {product.price}
        </div>
        {product.stand && (
          <Button
            fill="solid"
            color="medium"
            size="small"
            onClick={() =>
              navigate(`${ERoutesName.STANDS_LIST}/${product.stand?.id}`, {
                state: { goBackUrl: ERoutesName.PRODUCTS_LIST },
              })
            }
            className={styles.productListBtnGoToStand}
          >
            Ver Stand
          </Button>
        )}
      </div>
    </article>
  );
};
