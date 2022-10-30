import { BiFilterAlt } from "react-icons/bi";

import { Button } from "@/components/common/buttons/Button";
import { Fetcher } from "@/components/common/Fetcher";
import { Skeleton } from "@/components/common/Skeleton";
import { TopBar } from "@/components/common/TopBar";
import { FairCardList } from "@/components/modules/fairs/FairCardList";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useFairs } from "@/hooks/useFairs";

export const FairsList: React.FC = () => {
  useDocumentTitle("Lista de Ferias 🛍️");
  const {
    fairsList,
    isLoadingFairsList,
    handleRefreshFairList,
    handleInfiniteFairList,
  } = useFairs({ defaultPerPage: 10 });

  return (
    <>
      <TopBar
        title="Ferias"
        end={
          <Button>
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
          {isLoadingFairsList && !fairsList.length
            ? Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} height={130} style={{ marginBottom: 20 }} />
                ))
            : fairsList.map((fair) => (
                <FairCardList key={fair.id} fair={fair} />
              ))}
        </div>
      </Fetcher>
    </>
  );
};
