import { useToast } from "@/hooks/useToast";
import { deleteStandFairRequest } from "@/services";
import { useIonAlert, useIonLoading } from "@ionic/react";

export interface UseStandRemoveFairProps {
  standID: string;
  handleRefresh: () => Promise<any>;
}

export const useStandRemoveFair = ({
  standID,
  handleRefresh,
}: UseStandRemoveFairProps) => {
  const [presentAlert] = useIonAlert();
  const [presentLoading, dismissLoading] = useIonLoading();
  const { toast } = useToast();

  const onRemove = async (fairID: string) => {
    presentLoading();

    try {
      await deleteStandFairRequest(standID, fairID);

      await handleRefresh();

      toast("Has abandonado la feria con éxito", {
        type: "success",
      });
    } catch (error) {
      toast(error, {
        type: "error",
      });
    } finally {
      dismissLoading();
    }
  };

  const handleRemove = (fairID: string) => {
    presentAlert({
      header: "Abandonar Feria",
      message: "¿Estás seguro de que deseas abandonar esta feria?",
      buttons: [
        {
          text: "Cerrar",
          role: "cancel",
        },
        {
          text: "Confirmar",
          role: "confirm",
          handler: async () => await onRemove(fairID),
        },
      ],
    });
  };

  return {
    handleRemove,
  };
};
