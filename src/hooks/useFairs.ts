import { useState } from "react";
import { useIonToast } from "@ionic/react";

import { useFairsStateValue } from "@/context/FairsContext";
import { fairsActions } from "@/context/actions/fairsActions";
import { getUpcomingFairsDB } from "@/services/fairs";

export const useFairs = () => {
  const [present] = useIonToast();
  const [{ upcoming }, dispatch] = useFairsStateValue();
  const { setFairsUpcoming } = fairsActions(dispatch);
  const [loading, setLoading] = useState<boolean>(true);

  const getUpcomingFairs = async () => {
    setLoading(true);
    try {
      const upcoming = await getUpcomingFairsDB();
      setFairsUpcoming(upcoming);
    } catch (error) {
      present("Error al cargar las próximas ferias", 3000);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fairsUpcoming: upcoming,
    getUpcomingFairs,
  };
};
