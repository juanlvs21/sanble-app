import { useToast } from "@/hooks/useToast";
import { deleteFairStandRequest } from "@/services";
import { useIonAlert, useIonLoading } from "@ionic/react";

export interface UseFairRemoveStandProps {
  fairID: string;
  handleRefresh: () => Promise<any>;
}

export const useFairRemoveStand = ({
  fairID,
  handleRefresh,
}: UseFairRemoveStandProps) => {
  const [presentAlert] = useIonAlert();
  const [presentLoading, dismissLoading] = useIonLoading();
  const { toast } = useToast();

  const onRemove = async (standId: string) => {
    presentLoading();

    try {
      await deleteFairStandRequest(fairID, standId);

      await handleRefresh();

      toast("Stand eliminado con éxito", {
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

  const handleRemove = (standId: string) => {
    presentAlert({
      header: "Eliminar Stand",
      message: "¿Estás seguro de que deseas eliminar este stand de tu feria?",
      buttons: [
        {
          text: "Cerrar",
          role: "cancel",
        },
        {
          text: "Confirmar",
          role: "confirm",
          handler: async () => await onRemove(standId),
        },
      ],
    });
  };

  return {
    handleRemove,
  };
};
