import { Button } from "@/components/common/buttons/Button";
import { ImageExtended } from "@/components/common/Image";
import { useApp } from "@/hooks/useApp";
import { useUser } from "@/hooks/useUser";
import styles from "./TopBarUserBtn.module.css";

export const TopBarUserBtn: React.FC = () => {
  const { handleShowSidebar } = useApp();
  const { user } = useUser();

  return (
    <Button onClick={() => handleShowSidebar()} icon-only>
      <ImageExtended
        src={user?.photoURL}
        alt="Perfil"
        classNamePicture={styles.topBarUserPicture}
        className={styles.topBarUserImg}
        skeletonProps={{
          className: styles.topBarUserImg,
        }}
      />
    </Button>
  );
};
