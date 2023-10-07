import { useIonActionSheet } from "@ionic/react";
import { BiFilterAlt } from "react-icons/bi";

import { Fetcher } from "@/components/common/Fetcher";
import { Skeleton } from "@/components/common/Skeleton";
import { Button } from "@/components/common/buttons/Button";
import { ButtonLoadMore } from "@/components/common/buttons/ButtonLoadMore";
import { FairCardList } from "@/components/modules/fairs/FairCardList";
import { useFairsList } from "@/hooks/fairs/useFairsList";
import { useApp } from "@/hooks/useApp";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import { useTopBarMain } from "@/hooks/useTopBarMain";
import styles from "./FairsList.module.css";

export const FairsList = () => {
  useDocumentTitleApp("Lista de Ferias 🛍️");
  const [present] = useIonActionSheet();
  const { renderTopBarActionEnd } = useTopBarMain();
  const { isCapacitor } = useApp();
  const {
    list,
    orderBy,
    orderDir,
    isLoading,
    isLoadMore,
    showLoadMoreBtn,
    handleRefresh,
    handleShorting,
    handleLoadMore,
  } = useFairsList();

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
              header: "Ordenar Ferias",
              buttons: [
                {
                  text: "Mejor puntuadas",
                  cssClass: actionCssClasses(
                    orderBy === "stars",
                    orderDir === "desc"
                  ),
                  handler: () => handleShorting("stars", "desc"),
                },
                {
                  text: "Menor puntuadas",
                  cssClass: actionCssClasses(
                    orderBy === "stars",
                    orderDir === "asc"
                  ),
                  handler: () => handleShorting("stars", "asc"),
                },
                {
                  text: "Fechas cercanas",
                  cssClass: actionCssClasses(
                    orderBy === "celebrationDate",
                    orderDir === "desc"
                  ),
                  handler: () => handleShorting("celebrationDate", "desc"),
                },
                {
                  text: "Por nombre",
                  cssClass: actionCssClasses(
                    orderBy === "name",
                    orderDir === "asc"
                  ),
                  handler: () => handleShorting("name", "asc"),
                },
                {
                  text: "Limpiar filtro",
                  cssClass: actionCssClasses(),
                  handler: () => handleShorting("stars", "desc"),
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
        isLoading={isLoading || isLoading}
      >
        <>
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
                      className={styles.fairListCardSkeleton}
                    />
                  ))
              : list.map((fair) => <FairCardList key={fair.id} fair={fair} />)}
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
