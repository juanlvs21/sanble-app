import { useIonActionSheet } from "@ionic/react";
import { BiFilterAlt } from "react-icons/bi";
import { useDocumentTitle } from "usehooks-ts";

import { Button } from "@/components/common/buttons/Button";
import { Fetcher } from "@/components/common/Fetcher";
import { Skeleton } from "@/components/common/Skeleton";
import { StandCardList } from "@/components/modules/stands/StandCardList";
import { useMySanbleStandsList } from "@/hooks/mySanble/useMySanbleStandsList";
import { useApp } from "@/hooks/useApp";
import { useTopBarMain } from "@/hooks/useTopBarMain";
import styles from "./MySanbleStandsList.module.css";

export const MySanbleStandsList = () => {
  useDocumentTitle("Lista de Mis Stands 🛒");
  const [present] = useIonActionSheet();
  const { renderTopBarActionEnd } = useTopBarMain();
  const { isCapacitor } = useApp();
  const {
    list,
    orderBy,
    orderDir,
    isLoading,
    handleRefresh,
    handleInfinite,
    handleShorting,
  } = useMySanbleStandsList();

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
              header: "Ordenar Stands",
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
        handleInfiniteScroll={handleInfinite}
        classNameSection="animate__animated animate__screenInUp"
        isLoading={isLoading || isLoading}
      >
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
            : list.map((stand) => (
                <StandCardList key={stand.id} stand={stand} />
              ))}
        </div>
      </Fetcher>
    </>
  );
};
