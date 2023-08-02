import { Fetcher } from "@/components/common/Fetcher";

// import styles from "./Profile.module.css";

import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import { useUser } from "@/hooks/useUser";

export const Profile = () => {
  const { user } = useUser();
  const title = user?.displayName || user?.email || "Mi Perfil";
  useDocumentTitleApp(`${title} 👤`);

  return (
    <Fetcher
      // handleRefresh={handleRefresh}
      // handleInfiniteScroll={handleInfinite}
      classNameSection="animate__animated animate__screenInUp"
      // isLoading={isLoading || isLoading}
    >
      <h1>Profile</h1>
    </Fetcher>
  );
};
