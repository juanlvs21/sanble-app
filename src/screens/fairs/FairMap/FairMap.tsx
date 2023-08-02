import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/common/buttons/Button";
import { Map } from "@/components/modules/geolocation/Map";
import { formatFairsMarks } from "@/helpers/mapFormatMarkers";
import { useFairDetails } from "@/hooks/fairs/useFairDetails";
import { useApp } from "@/hooks/useApp";
import { useTopBarMain } from "@/hooks/useTopBarMain";
import { ERoutesName } from "@/types/TRoutes";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import styles from "./FairMap.module.css";

type TRouteParams = { fairID: string };

export const FairMap = () => {
  useDocumentTitleApp("Cerca de ti 📌");
  const navigate = useNavigate();
  const { fairID } = useParams<TRouteParams>();
  const { state } = useLocation();
  const { isCapacitor } = useApp();
  const { renderTopBarActionStart } = useTopBarMain();

  const finalFairID = fairID || state?.fairID || "";

  const { fair, isLoadingDetails } = useFairDetails(finalFairID);

  const handleGoDetailsFair = () => {
    navigate(`${ERoutesName.FAIRS_LIST}/${finalFairID}`, {
      state: fair ? { fairID: fair.id, fairName: fair.name } : {},
    });
  };

  return (
    <>
      {renderTopBarActionStart(
        <Button onClick={handleGoDetailsFair} fill="clear" color="medium">
          <IoIosArrowBack size={24} />
        </Button>
      )}

      <section
        className={`${styles.mapSection} ${
          isCapacitor ? styles.isCapacitor : ""
        } animate__animated animate__screenInUp`}
      >
        {fair && (
          <Map
            center={fair.geopoint}
            markers={formatFairsMarks([
              {
                id: fair.id,
                name: fair.name,
                geopoint: fair.geopoint,
                stars: fair.stars,
                type: fair.type,
              },
            ])}
            isLoading={isLoadingDetails}
            errorMsg={
              !fair?.geopoint
                ? `${fair?.name || "Esta Feria"} no posee ubicación geográfica`
                : undefined
            }
          />
        )}
      </section>
    </>
  );
};
