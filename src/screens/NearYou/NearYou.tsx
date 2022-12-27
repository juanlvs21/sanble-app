import { useEffect } from "react";

import { TopBar } from "@/components/common/TopBar";
import { Map } from "@/components/modules/geolocation/Map";
// import { formatFairsMarks } from "@/helpers/mapFormatMarkers";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import styles from "./NearYou.module.css";
import { useFairsListGeo } from "@/hooks/fairs/useFairsListGeo";

export const NearYou: React.FC = () => {
  useDocumentTitle("Cerca de ti 📌");
  const { list, isLoading, prepareListMapPin } = useFairsListGeo();

  return (
    <>
      <TopBar title="Cerca de ti" startUser stickyNoScroll />
      <section className={styles.mapSection}>
        <Map markers={prepareListMapPin(list)} isLoading={isLoading} />
      </section>
    </>
  );
};
