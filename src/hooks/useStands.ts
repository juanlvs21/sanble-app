import { useState } from "react";
import { useIonToast } from "@ionic/react";

import { useStandsStateValue } from "@/context/StandsContext";
import { standsActions } from "@/context/actions/standsActions";
import { getBestStandsDB } from "@/services/stands";

export const useStands = () => {
  const [present] = useIonToast();
  const [{ bests }, dispatch] = useStandsStateValue();
  const { setStandsBest } = standsActions(dispatch);
  const [loading, setLoading] = useState<boolean>(true);

  const getBestStands = async () => {
    setLoading(true);
    try {
      const bests = await getBestStandsDB();
      setStandsBest(bests);
    } catch (error) {
      console.log({ error });
      present("Error al cargar las próximas ferias", 3000);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    standsBests: bests,
    getBestStands,
  };
};
