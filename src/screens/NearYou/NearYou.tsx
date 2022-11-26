import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { TopBar } from "@/components/common/TopBar";
import { Map } from "@/components/modules/geolocation/Map";
import styles from "./NearYou.module.css";

export const NearYou: React.FC = () => {
  useDocumentTitle("Cerca de ti 📌");

  return (
    <>
      <TopBar title="Cerca de ti" startUser stickyNoScroll />
      <section className={styles.mapSection}>
        <Map />
      </section>
    </>
  );
};
