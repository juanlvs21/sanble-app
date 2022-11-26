import { useEffect } from "react";

import { TopBar } from "@/components/common/TopBar";
import { Map } from "@/components/modules/geolocation/Map";
import { formatFairsMarks } from "@/helpers/mapFormatMarkers";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useFairs } from "@/hooks/useFairs";
import styles from "./NearYou.module.css";

export const NearYou: React.FC = () => {
  useDocumentTitle("Cerca de ti 📌");
  const { handleLoadFairsListGeo, fairsListGeo, isLoadingFairsListGeo } =
    useFairs();

  useEffect(() => {
    handleLoadFairsListGeo();
  }, []);

  return (
    <>
      <TopBar title="Cerca de ti" startUser stickyNoScroll />
      <section className={styles.mapSection}>
        <Map markers={fairsListGeo} isLoading={isLoadingFairsListGeo} />
      </section>
    </>
  );
};
