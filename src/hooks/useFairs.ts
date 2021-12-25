import { useState } from "react";
import { toast } from "react-toastify";

import { getRecentFairsDB } from "@/helpers/firebase";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setFairsAction } from "@/store/slices/fairsSlice";

export const useFairs = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  const fairsStore = useAppSelector(({ fairs }) => fairs.list);

  const getRecentFairs = async () => {
    try {
      const fairs = await getRecentFairsDB();
      dispatch(setFairsAction(fairs));
    } catch (error) {
      toast("Error al cargar las próximas ferias", { type: "error" });
    }
  };

  const handleGetRecentFairs = async () => {
    setLoading(true);
    await getRecentFairsDB();
    setLoading(false);
  };

  const handleRefresh = async () => {
    await Promise.all([getRecentFairs()]);
  };

  return {
    loading,
    fairs: fairsStore,
    getRecentFairs,
    handleGetRecentFairs,
    handleRefresh,
  };
};
