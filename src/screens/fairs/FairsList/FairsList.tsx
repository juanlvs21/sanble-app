import { useIonActionSheet } from "@ionic/react";
import { useEffect } from "react";
import { BiFilterAlt } from "react-icons/bi";

import { Button } from "@/components/common/buttons/Button";
import { Fetcher } from "@/components/common/Fetcher";
import { Skeleton } from "@/components/common/Skeleton";
import { TopBar } from "@/components/common/TopBar";
import { FairCardList } from "@/components/modules/fairs/FairCardList";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useFairs } from "@/hooks/useFairs";
import { EFairOrderBy } from "@/types/TFair";
import styles from "./FairsList.module.css";

export const FairsList: React.FC = () => {
  useDocumentTitle("Lista de Ferias 🛍️");
  const [present] = useIonActionSheet();
  const {
    fairsList,
    isLoadingFairsList,
    orderBy,
    handleLoadFairsList,
    handleRefreshFairList,
    handleInfiniteFairList,
  } = useFairs({ defaultPerPage: 10 });

  useEffect(() => {
    handleLoadFairsList();
  }, []);

  return (
    <>
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
                    cssClass: orderBy == EFairOrderBy.BEST ? "active" : "",
                    handler: () =>
                      handleLoadFairsList({ orderBy: EFairOrderBy.BEST }),
                  },
                  {
                    text: "Menor puntuadas",
                    cssClass: orderBy == EFairOrderBy.WORST ? "active" : "",
                    handler: () =>
                      handleLoadFairsList({ orderBy: EFairOrderBy.WORST }),
                  },
                  {
                    text: "Favoritos",
                    cssClass: orderBy == EFairOrderBy.FAVORITE ? "active" : "",
                    handler: () =>
                      handleLoadFairsList({ orderBy: EFairOrderBy.FAVORITE }),
                  },
                  {
                    text: "Fechas cercanas",
                    cssClass:
                      orderBy == EFairOrderBy.CELEBRATIONDATE ? "active" : "",
                    handler: () =>
                      handleLoadFairsList({
                        orderBy: EFairOrderBy.CELEBRATIONDATE,
                      }),
                  },
                  {
                    text: "Limpiar filtro",
                    // cssClass: "warning-color",
                    handler: () => handleLoadFairsList(),
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
        handleRefresh={handleRefreshFairList}
        handleInfiniteScroll={handleInfiniteFairList}
      >
        <div className="dataListContainer">
          {isLoadingFairsList && !fairsList?.list.length
            ? Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    height={130}
                    className={styles.fairListCardSkeleton}
                  />
                ))
            : fairsList?.list.map((fair) => (
                <FairCardList key={fair.id} fair={fair} />
              ))}
        </div>
      </Fetcher>
    </>
  );
};
