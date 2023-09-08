import { IonFab, IonFabButton, useIonActionSheet } from "@ionic/react";
import { BiFilterAlt } from "react-icons/bi";
import { IoMdAdd, IoMdAddCircle } from "react-icons/io";

import { EmptyList } from "@/components/common/EmptyList";
import { Fetcher } from "@/components/common/Fetcher";
import { Skeleton } from "@/components/common/Skeleton";
import { Button } from "@/components/common/buttons/Button";
import { ButtonLoadMore } from "@/components/common/buttons/ButtonLoadMore";
import { StandCardList } from "@/components/modules/stands/StandCardList";
import { useMyStandsList } from "@/hooks/mySanble/stands/useMyStandsList";
import { useApp } from "@/hooks/useApp";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import { useTopBarMain } from "@/hooks/useTopBarMain";
import { ERoutesName } from "@/types/TRoutes";
import { Link } from "react-router-dom";
import styles from "./MyStandsList.module.css";

export const MyStandsList = () => {
  useDocumentTitleApp("Lista de Mis Stands 🛒");
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
  } = useMyStandsList();

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

      <IonFab
        slot="fixed"
        vertical="bottom"
        horizontal="end"
        className={`${styles.standFloatBtn} animate__animated animate__fadeIn`}
      >
        <Link to={ERoutesName.MY_SANBLE_STANDS_NEW}>
          <IonFabButton color="secondary">
            <IoMdAdd size={28} />
          </IonFabButton>
        </Link>
      </IonFab>

      <Fetcher
        handleRefresh={handleRefresh}
        classNameSection="animate__animated animate__screenInUp"
        isLoading={isLoading || isLoading}
      >
        <>
          {isEmpty && (
            <EmptyList
              title="No tienes Stands Creados"
              subtitle={
                <>
                  Te invitamos a crear un nuevo stand usando el boton{" "}
                  <IoMdAddCircle size={24} />
                </>
              }
            />
          )}
          <div
            className={`dataListContainer ${isCapacitor ? "isCapacitor" : ""} `}
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
                  <StandCardList
                    key={stand.id}
                    stand={stand}
                    goBackUrl={ERoutesName.MY_SANBLE_STANDS}
                  />
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
