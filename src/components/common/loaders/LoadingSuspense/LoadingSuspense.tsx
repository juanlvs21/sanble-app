import styles from "../Loaders.module.css";
import { Spinner } from "@/components/common/loaders/Spinner";

export const LoadingSuspense: React.FC = () => (
  <div
    className={`animate__animated animate__fadeIn ${styles.loadingSuspenseContainer}`}
  >
    <Spinner />
  </div>
);
