import { Map } from "@/components/modules/geolocation/Map";
import { useFairsListGeo } from "@/hooks/fairs/useFairsListGeo";
import { useApp } from "@/hooks/useApp";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./NearYou.module.css";

export const NearYou = () => {
  useDocumentTitleApp("Cerca de ti 📌");
  const { list, isLoading, prepareListMapPin } = useFairsListGeo();
  const { isCapacitor } = useApp();

  return (
    <section
      className={`${styles.mapSection} ${
        isCapacitor ? styles.isCapacitor : ""
      } animate__animated animate__screenInUp`}
    >
      <Map
        markers={prepareListMapPin(list || [], ERoutesName.NEAR_YOU)}
        isLoading={isLoading}
      />
    </section>
  );
};
