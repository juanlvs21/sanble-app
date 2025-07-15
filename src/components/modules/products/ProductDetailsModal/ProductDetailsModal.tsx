import {
  IonButtons,
  IonContent,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

import { HeaderModal } from "@/components/common/HeaderModal";
import { Button } from "@/components/common/buttons/Button";
import { TProduct } from "@/types/TProduct";

import styles from "./ProductDetailsModal.module.css";
import { ImageExtended } from "@/components/common/ImageExtended";
import { getProductTypeNameByKey } from "@/helpers/productTypes";
import { ERoutesName } from "@/types/TRoutes";
import { useModalGoBack } from "@/hooks/useModalGoBack";

export type ComponentProps = {
  /**
   * Product Details
   */
  product?: TProduct;
  isOpen?: boolean;
  onDismiss?: () => void;
};

export const ProductDetailsModal = ({
  product,
  isOpen = false,
  onDismiss,
}: ComponentProps) => {
  useModalGoBack(isOpen, onDismiss);

  return (
    <IonModal
      isOpen={isOpen}
      onWillDismiss={onDismiss}
      className={styles.productDetailsModal}
    >
      <HeaderModal>
        <IonToolbar>
          <IonButtons slot="end">
            <Button onClick={onDismiss} fill="clear" color="medium">
              <AiOutlineClose size={24} />
            </Button>
          </IonButtons>
          <IonTitle>Detalles del producto</IonTitle>
        </IonToolbar>
      </HeaderModal>
      <IonContent>
        {product && (
          <div className={styles.productDetailsContainer}>
            <div>
              <ImageExtended
                src={product.fileUrl}
                alt={product.name}
                className={styles.productDetailsContentImg}
                skeletonProps={{
                  className: styles.productDetailsContentImg,
                }}
              />
            </div>
            <div className={styles.productDetailsContent}>
              <h1>{product.name}</h1>
              {product.description && <p>{product.description}</p>}

              <div className={styles.productDetailsContentPrice}>
                <p>Precio:</p>
                <b>
                  <span>
                    {product.currency} {product.price}
                  </span>
                </b>
              </div>
              {product.type && (
                <p className={styles.productDetailsContentType}>
                  <b>Categoría:</b> {getProductTypeNameByKey(product.type)}
                </p>
              )}

              <span className={`${styles.divider}`} />

              <div className={styles.productDetailsContentStand}>
                <p>
                  <b>Stand:</b> {product.stand?.name || "No asignado"}
                </p>
                <Link to={`${ERoutesName.STANDS_LIST}/${product.stand?.id}`}>
                  <Button expand="block" size="default" color="light">
                    Ir al Stand
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </IonContent>
    </IonModal>
  );
};
