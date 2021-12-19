import { toast } from "react-toastify";

import { getRecentFairsDB } from "@/helpers/firebase";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setFairsAction } from "@/store/slices/fairsSlice";

export const useFairs = () => {
  const dispatch = useAppDispatch();

  const fairsStore = useAppSelector(({ fairs }) => fairs.list);

  const getRecentFairs = async () => {
    try {
      const fairs = await getRecentFairsDB();
      dispatch(setFairsAction(fairs));
    } catch (error) {
      toast("Error al cargar las próximas ferias", { type: "error" });
    }
  };

  return {
    fairs: fairsStore,
    getRecentFairs,
  };
};
