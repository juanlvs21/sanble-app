import { TopBar } from "@/components/common/TopBar";
import { Map } from "@/components/modules/geolocation/Map";
// import { formatFairsMarks } from "@/helpers/mapFormatMarkers";
import { useFairsListGeo } from "@/hooks/fairs/useFairsListGeo";
import { useApp } from "@/hooks/useApp";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import styles from "./NearYou.module.css";

export const NearYou = () => {
  useDocumentTitle("Cerca de ti 📌");
  const { list, isLoading, prepareListMapPin } = useFairsListGeo();
  const { isCapacitor } = useApp();

  return (
    <>
      <TopBar title="Cerca de ti" startUser stickyNoScroll />
      <section className={styles.mapSection}>
        <Map
          markers={prepareListMapPin(list)}
          isLoading={isLoading}
          classNameSpinner={`${styles.nearYouSpinner} ${
            isCapacitor ? styles.isCapacitor : ""
          }`}
        />
      </section>
    </>
  );
};
