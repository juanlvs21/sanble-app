import { useIonActionSheet } from "@ionic/react";
import { BiFilterAlt } from "react-icons/bi";

import { Button } from "@/components/common/buttons/Button";
import { Fetcher } from "@/components/common/Fetcher";
import { Skeleton } from "@/components/common/Skeleton";
import { TopBar } from "@/components/common/TopBar";
import { StandCardList } from "@/components/modules/stands/StandCardList";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useStandsList } from "@/hooks/stands/useStandsList";
import styles from "./StandsList.module.css";

export const StandsList = () => {
  useDocumentTitle("Lista de Stands 🛒");
  const [present] = useIonActionSheet();
  const {
    list,
    orderBy,
    orderDir,
    isLoading,
    isSorting,
    handleRefresh,
    handleInfinite,
    handleShorting,
  } = useStandsList();

  const actionCssClasses = (isOrderBy = false, isOrderDir = false) => {
    const classes = [];

    if (isSorting) classes.push("disable");
    if (isOrderBy && isOrderDir) classes.push("active");

    return classes.length ? classes : "";
  };

  return (
    <>
      <TopBar
        title="Stands"
        end={
          <Button
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
                    text: "Limpiar filtro",
                    cssClass: actionCssClasses(),
                    handler: () => handleShorting("stars", "desc"),
                  },
                  {
                    text: "Cancel",
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
        }
        startUser
        sticky
      />

      <Fetcher
        handleRefresh={handleRefresh}
        handleInfiniteScroll={handleInfinite}
      >
        <div className="dataListContainer">
          {(isLoading && !list.length) || isSorting
            ? Array(5)
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
