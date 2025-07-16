import { useState } from "react";
import { UseFormReset } from "react-hook-form";
import { useIonAlert } from "@ionic/react";

import { authActions } from "@/context/actions/authActions";
import { useAuthContext } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import {
  changePasswordUserRequest,
  setFavoriteRequest,
  updateUserRequest,
} from "@/services";
import { EUserFav, TChangePassword, TUpdateUser } from "@/types/TUser";

export const useUser = () => {
  const [presentAlert] = useIonAlert();
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

  const handleSetFavoriteFair = async (
    favoriteID: string,
    currentIsFavorite?: boolean,
    options?: { withConfirmRemove?: boolean }
  ) => {
    if (currentIsFavorite && options?.withConfirmRemove) {
      presentAlert({
        header: "Eliminar Favorito",
        message: "¿Estás seguro de que deseas eliminar este favorito?",
        buttons: [
          {
            text: "Cerrar",
            role: "cancel",
          },
          {
            text: "Confirmar",
            role: "confirm",
            handler: async () => await setFavorite(EUserFav.FAIR, favoriteID),
          },
        ],
      });
    } else {
      await setFavorite(EUserFav.FAIR, favoriteID);
    }
  };

  const handleSetFavoriteStand = async (
    favoriteID: string,
    currentIsFavorite?: boolean,
    options?: { withConfirmRemove?: boolean }
  ) => {
    if (currentIsFavorite && options?.withConfirmRemove) {
      presentAlert({
        header: "Eliminar Favorito",
        message: "¿Estás seguro de que deseas eliminar este favorito?",
        buttons: [
          {
            text: "Cerrar",
            role: "cancel",
          },
          {
            text: "Confirmar",
            role: "confirm",
            handler: async () => await setFavorite(EUserFav.STAND, favoriteID),
          },
        ],
      });
    } else {
      await setFavorite(EUserFav.STAND, favoriteID);
    }
  };

  const handleUpdateUser = async (userForm: TUpdateUser) => {
    try {
      setIsLoading(true);

      const newUser = await updateUserRequest(userForm);

      toast("Datos del usuario cambiados existosamente", { type: "success" });

      setUser(newUser);
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      setIsLoading(true);
    }
  };

  const handleChangePasswordUser = async (
    { password }: TChangePassword,
    reset: UseFormReset<TChangePassword>
  ) => {
    try {
      setIsLoading(true);

      await changePasswordUserRequest({ password });

      toast("Contraseña cambiada existosamente", { type: "success" });

      reset();
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
    handleChangePasswordUser,
  };
};
