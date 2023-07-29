import { useMemo } from "react";
import { BiStoreAlt } from "react-icons/bi";
import { Outlet, useLocation, useMatch } from "react-router-dom";

import { BottomBar } from "@/components/common/BottomBar";
import { ERoutesName } from "@/types/TRoutes";
import { MdOutlineStorefront } from "react-icons/md";
import styles from "./FavoritesList.module.css";

export const FavoritesList = () => {
  const { pathname } = useLocation();

  const matchFavoritesFairs = useMatch(ERoutesName.FAVORITES_FAIRS);
  const matchFavoritesStands = useMatch(ERoutesName.FAVORITES_STANDS);

  const items = useMemo(
    () => [
      {
        path: ERoutesName.FAVORITES_FAIRS,
        icon: <BiStoreAlt size={26} />,
        active: matchFavoritesFairs,
      },
      {
        path: ERoutesName.FAVORITES_STANDS,
        icon: <MdOutlineStorefront size={26} />,
        active: matchFavoritesStands,
      },
    ],
    [pathname]
  );

  return (
    <div className={`${styles.favoritesContainer}`}>
      <section className={`${styles.favoritesContent}`}>
        <Outlet />
      </section>
      <BottomBar items={items} />
    </div>
  );
};
