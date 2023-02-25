import { Map } from "@/components/modules/geolocation/Map";
import { useFairsListGeo } from "@/hooks/fairs/useFairsListGeo";
import { useApp } from "@/hooks/useApp";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./NearYou.module.css";

export const NearYou = () => {
  useDocumentTitle("Cerca de ti 📌");
  const { list, isLoading, prepareListMapPin } = useFairsListGeo();
  const { isCapacitor } = useApp();

  return (
    <section
      className={`${styles.mapSection} animate__animated animate__screenInUp`}
    >
      <Map
        markers={prepareListMapPin(list, ERoutesName.NEAR_YOU)}
        isLoading={isLoading}
        classNameSpinner={`${styles.nearYouSpinner} ${
          isCapacitor ? styles.isCapacitor : ""
        }`}
      />
    </section>
  );
};
