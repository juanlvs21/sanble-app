import { useIonActionSheet } from "@ionic/react";
import { createPortal } from "react-dom";
import { BiFilterAlt } from "react-icons/bi";
import { RouteComponentProps } from "react-router";

import { Button } from "@/components/common/buttons/Button";
import { Fetcher } from "@/components/common/Fetcher";
import { Skeleton } from "@/components/common/Skeleton";
import { TopBar } from "@/components/common/TopBar";
import { FairCardList } from "@/components/modules/fairs/FairCardList";
import { useFairsList } from "@/hooks/fairs/useFairsList";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import styles from "./FairsList.module.css";
import { useTopBar } from "@/hooks/useTopBar";

type TPageProps = RouteComponentProps<{}>;

export const FairsList: React.FC<TPageProps> = () => {
  useDocumentTitle("Lista de Ferias 🛍️");
  const [present] = useIonActionSheet();
  const { renderTopBar } = useTopBar();
  const {
    list,
    orderBy,
    orderDir,
    isLoading,
    isSorting,
    handleRefresh,
    handleInfinite,
    handleShorting,
  } = useFairsList();

  const actionCssClasses = (isOrderBy = false, isOrderDir = false) => {
    const classes = [];

    if (isSorting) classes.push("disable");
    if (isOrderBy && isOrderDir) classes.push("active");

    return classes.length ? classes : "";
  };

  return (
    <>
      {renderTopBar(
        <TopBar
          title="Ferias"
          end={
            <Button
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
      )}

      <Fetcher
        handleRefresh={handleRefresh}
        handleInfiniteScroll={handleInfinite}
        classNameSection="animate__animated animate__screenInUp"
      >
        <div className="dataListContainer">
          {(isLoading && !list.length) || isSorting
            ? Array(5)
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
      </Fetcher>
    </>
  );
};
