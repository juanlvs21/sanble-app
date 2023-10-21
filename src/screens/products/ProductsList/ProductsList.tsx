import { useIonActionSheet } from "@ionic/react";
import { BiFilterAlt } from "react-icons/bi";

import { EmptyList } from "@/components/common/EmptyList";
import { Fetcher } from "@/components/common/Fetcher";
import { Skeleton } from "@/components/common/Skeleton";
import { Button } from "@/components/common/buttons/Button";
import { ButtonLoadMore } from "@/components/common/buttons/ButtonLoadMore";
import { ProductList } from "@/components/modules/products/ProductList";
import { useApp } from "@/hooks/useApp";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import { useProductsList } from "@/hooks/useProductsList";
import { useTopBarMain } from "@/hooks/useTopBarMain";
import styles from "./ProductsList.module.css";

export const ProductsList = () => {
  useDocumentTitleApp("Lista de Productos 🛒");
  const [present] = useIonActionSheet();
  const { renderTopBarActionEnd } = useTopBarMain();
  const { isCapacitor } = useApp();
  const {
    list,
    orderBy,
    orderDir,
    isLoading,
    isLoadMore,
    isEmpty,
    showLoadMoreBtn,
    handleRefresh,
    handleShorting,
    handleLoadMore,
  } = useProductsList();

  const actionCssClasses = (isOrderBy = false, isOrderDir = false) => {
    const classes = [];

    if (isLoading) classes.push("disable");
    if (isOrderBy && isOrderDir) classes.push("active");

    return classes.length ? classes : "";
  };

  return (
    <>
      {renderTopBarActionEnd(
        <Button
          className="animate__animated animate__fadeIn"
          onClick={() =>
            present({
              header: "Ordenar Productos",
              buttons: [
                {
                  text: "Por nombre",
                  cssClass: actionCssClasses(
                    orderBy === "name",
                    orderDir === "asc"
                  ),
                  handler: () => handleShorting("name", "asc"),
                },
                {
                  text: "Mayor precio",
                  cssClass: actionCssClasses(
                    orderBy === "price",
                    orderDir === "asc"
                  ),
                  handler: () => handleShorting("price", "asc"),
                },
                {
                  text: "Menor precio",
                  cssClass: actionCssClasses(
                    orderBy === "price",
                    orderDir === "desc"
                  ),
                  handler: () => handleShorting("price", "desc"),
                },
                {
                  text: "Por fecha de creación",
                  cssClass: actionCssClasses(
                    orderBy === "creationTime",
                    orderDir === "asc"
                  ),
                  handler: () => handleShorting("creationTime", "asc"),
                },
                {
                  text: "Limpiar filtro",
                  cssClass: actionCssClasses(),
                  handler: () => handleShorting("name", "asc"),
                },
                {
                  text: "Cancelar",
                  cssClass: "danger-color",
                  role: "cancel",
                  data: {
                    action: "cancel",
                  },
                },
              ],
            })
          }
        >
          <BiFilterAlt size={24} />
        </Button>
      )}

      <Fetcher
        handleRefresh={handleRefresh}
        classNameSection="animate__animated animate__screenInUp"
        isLoading={isLoading}
      >
        <>
          {isEmpty && <EmptyList title="No hay productos para mostrar" />}
          <div
            className={`dataListContainer ${isCapacitor ? "isCapacitor" : ""}`}
          >
            {(isLoading && !list.length) || isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton
                      key={i}
                      height={130}
                      className={styles.standListCardSkeleton}
                    />
                  ))
              : list.map((product) => (
                  <ProductList key={product.id} product={product} />
                ))}
          </div>
          {showLoadMoreBtn && (
            <ButtonLoadMore
              handleLoadMore={handleLoadMore}
              isLoading={isLoadMore}
            />
          )}
        </>
      </Fetcher>
    </>
  );
};
