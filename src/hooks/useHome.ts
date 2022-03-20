import { useEffect } from "react";
import { useIonToast } from "@ionic/react";
import { useQuery } from "react-query";

import { getFairsUpcomingRequest, getStandsBestRequest } from "@/services";

export const useHome = () => {
  const [present] = useIonToast();
  const {
    data: dataFairs,
    error: errorFairs,
    isLoading: isLoadingFairs,
    refetch: refetchFairs,
  } = useQuery("/fairs/upcoming", getFairsUpcomingRequest);
  const {
    data: dataStands,
    error: errorStands,
    isLoading: isLoadingStands,
    refetch: refetchStands,
  } = useQuery("/stands/best", getStandsBestRequest);

  const handleRefresh = async () => {
    await Promise.all([refetchFairs, refetchStands]);
  };

  useEffect(() => {
    if (errorFairs) present("Error al cargar las próximas ferias", 3000);
  }, [errorFairs, present]);

  useEffect(() => {
    if (errorStands) present("Error al cargar los mejores stands", 3000);
  }, [errorStands, present]);

  return {
    handleRefresh,
    dataFairs: dataFairs || [],
    isLoadingFairs,
    dataStands: dataStands || [],
    isLoadingStands,
  };
};
