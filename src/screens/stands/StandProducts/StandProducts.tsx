import { IonFab, IonFabButton } from "@ionic/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";

import { EmptyList } from "@/components/common/EmptyList";
import { Fetcher } from "@/components/common/Fetcher";
import { Skeleton } from "@/components/common/Skeleton";
import { ButtonLoadMore } from "@/components/common/buttons/ButtonLoadMore";
import { ProductForm } from "@/components/modules/products/ProductForm";
import { ProductList } from "@/components/modules/products/ProductList";
import { useStandProducts } from "@/hooks/stands/useStandProducts";
import { useApp } from "@/hooks/useApp";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import { useUser } from "@/hooks/useUser";
import styles from "./StandProducts.module.css";

type TRouteParams = { standID: string };

export const StandProducts = () => {
  const { standID } = useParams<TRouteParams>();
  const { isCapacitor } = useApp();
  const { user } = useUser();
  const {
    stand,
    isLoading,
    isLoadMoreProducts,
    products,
    product,
    showLoadMoreProductsBtn,
    showModalProductForm,
    handleLoadAll,
    handleSaveProduct,
    handleUpdateProduct,
    handleLoadMoreProducts,
    handleActions,
    handleOpenModalNewProduct,
    toggleModalProductForm,
    isEmpty,
  } = useStandProducts(standID ?? "");

  useDocumentTitleApp(`${stand?.name || "Productos"} 🛒`);

  return (
    <section className={`${styles.productsContainer}`}>
      {user?.uid === stand?.owner.uid && (
        <IonFab
          slot="fixed"
          vertical="bottom"
          horizontal="end"
          className={`animate__animated animate__fadeIn`}
        >
          <IonFabButton color="secondary" onClick={handleOpenModalNewProduct}>
            <AiOutlinePlus size={22} />
          </IonFabButton>
        </IonFab>
      )}

      <Fetcher
        handleRefresh={handleLoadAll}
        classNameSection="animate__animated animate__screenInUp"
        isLoading={isLoading}
      >
        <>
          {isEmpty && (
            <EmptyList title="Este Stand no cuenta con productos actualmente" />
          )}

          <div
            className={`dataListContainer ${isCapacitor ? "isCapacitor" : ""}`}
          >
            {(isLoading && !products.length) || isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton
                      key={i}
                      height={130}
                      className={styles.productsCardSkeleton}
                    />
                  ))
              : products.map((product) => (
                  <ProductList
                    key={product.id}
                    product={product}
                    handleActions={handleActions}
                  />
                ))}
          </div>
          {showLoadMoreProductsBtn && (
            <ButtonLoadMore
              handleLoadMore={handleLoadMoreProducts}
              isLoading={isLoadMoreProducts}
            />
          )}
        </>
      </Fetcher>

      <ProductForm
        showModal={showModalProductForm}
        toggleModal={toggleModalProductForm}
        handleSave={product ? handleUpdateProduct : handleSaveProduct}
        product={product}
      />
    </section>
  );
};
