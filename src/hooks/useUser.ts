import { useState } from "react";

import { authActions } from "@/context/actions/authActions";
import { useAuthContext } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import { setFavoriteRequest, updateUserRequest } from "@/services";
import { EUserFav, TUpdateUser } from "@/types/TUser";

export const useUser = () => {
  const [{ user }, dispatch] = useAuthContext();
  const { setUser } = authActions(dispatch);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const setFavorite = async (favoriteType: EUserFav, favoriteID: string) => {
    setIsLoading(true);

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
      setIsLoading(false);
    }
  };

  const handleSetFavoriteFair = async (favoriteID: string) => {
    await setFavorite(EUserFav.FAIR, favoriteID);
  };

  const handleSetFavoriteStand = async (favoriteID: string) => {
    await setFavorite(EUserFav.STAND, favoriteID);
  };

  const handleUpdateUser = async (userForm: TUpdateUser) => {
    try {
      setIsLoading(true);

      const res = await updateUserRequest(userForm);

      console.log(res);
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      setIsLoading(true);
    }
  };

  return {
    user,
    isLoading,
    setUser,
    handleSetFavoriteFair,
    handleSetFavoriteStand,
    handleUpdateUser,
  };
};
