import { useState } from "react";

import { authActions } from "@/context/actions/authActions";
import { useAuthContext } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import { setFavoriteRequest } from "@/services";
import { EUserFav } from "@/types/TUser";

export const useUser = () => {
  const [{ user }, dispatch] = useAuthContext();
  const { setUser } = authActions(dispatch);
  const { toast } = useToast();
  const [loadingSetFav, setLoadingSetFav] = useState(false);

  const setFavorite = async (favoriteType: EUserFav, favoriteID: string) => {
    setLoadingSetFav(true);

    try {
      const { favorites } = await setFavoriteRequest(favoriteType, favoriteID);
      if (user) {
        let newFavorites = {};

        if (favoriteType === EUserFav.FAIR)
          newFavorites = { favoriteFairs: favorites };
        if (favoriteType === EUserFav.STAND)
          newFavorites = { favoriteStands: favorites };
        if (favoriteType === EUserFav.PRODUCT)
          newFavorites = { favoriteProducts: favorites };

        setUser({
          ...user,
          ...newFavorites,
        });

        const existFav = favorites.includes(favoriteID);

        toast(
          existFav
            ? "Se ha agregado a favoritos"
            : "Se ha eliminado de favoritos",
          { type: "info" }
        );
      }
    } catch (error) {
      toast("Ha ocurrido un error al guardar el favorito", { type: "error" });
    } finally {
      setLoadingSetFav(false);
    }
  };

  const handleSetFavoriteFair = async (favoriteID: string) => {
    await setFavorite(EUserFav.FAIR, favoriteID);
  };

  const handleSetFavoriteStand = async (favoriteID: string) => {
    await setFavorite(EUserFav.STAND, favoriteID);
  };

  return {
    user,
    loadingSetFav,
    setUser,
    handleSetFavoriteFair,
    handleSetFavoriteStand,
  };
};
