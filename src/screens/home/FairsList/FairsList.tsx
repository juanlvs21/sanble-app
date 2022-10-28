import { BiFilterAlt } from "react-icons/bi";

import { Button } from "@/components/common/buttons/Button";
import Fetcher from "@/components/common/Fetcher/Fetcher";
import { TopBar } from "@/components/common/TopBar";
import { FairCardList } from "@/components/modules/fairs/FairCardList";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useFairs } from "@/hooks/useFairs";

export const FairsList: React.FC = () => {
  const { fairsList, refetchFairsList } = useFairs();
  useDocumentTitle("Lista de Ferias 🛍️");

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
        handleRefresh={refetchFairsList}
        handleInfiniteScroll={refetchFairsList}
      >
        <div className="dataListContainer">
          {fairsList &&
            fairsList.fairs.map((fair) => (
              <FairCardList key={fair.id} fair={fair} />
            ))}
        </div>
      </Fetcher>
    </>
  );
};