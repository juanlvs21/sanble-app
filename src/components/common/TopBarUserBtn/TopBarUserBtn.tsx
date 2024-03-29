import { Button } from "@/components/common/buttons/Button";
import { ImageExtended } from "@/components/common/ImageExtended";
import { useApp } from "@/hooks/useApp";
import { useUser } from "@/hooks/useUser";
import styles from "./TopBarUserBtn.module.css";

export const TopBarUserBtn = () => {
  const { handleShowSidebar } = useApp();
  const { user } = useUser();

  return (
    <Button
      onClick={() => handleShowSidebar()}
      icon-only
      className=" animate__animated animate__fadeIn"
    >
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
