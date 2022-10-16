import { Button } from "@/components/common/buttons/Button";
import { useApp } from "@/hooks/useApp";
import { useAuth } from "@/hooks/useAuth";
import styles from "./TopBarUserBtn.module.css";

export const TopBarUserBtn: React.FC = () => {
  const { handleShowSidebar } = useApp();
  const { user } = useAuth();

  return (
    <Button onClick={() => handleShowSidebar()} icon-only>
      <img
        src={user?.photoURL}
        alt="Perfil"
        className={styles.homeTopBarUserPhoto}
      />
    </Button>
  );
};
