import { useIonLoading } from "@ionic/react";

import { useToast } from "@/hooks/useToast";
import { unsendInvitationRequest } from "@/services/invitation";

export type TUseInvitationUnsend = {
  handleReload: () => Promise<void>;
};

export const useInvitationUnsend = ({ handleReload }: TUseInvitationUnsend) => {
  const [presentLoading, dismissLoading] = useIonLoading();
  const { toast } = useToast();

  const handleUnsend = async (invitationId: string) => {
    try {
      presentLoading();

      await unsendInvitationRequest(invitationId);

      toast("Inivitacion cancelada", { type: "success" });

      await handleReload();
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      dismissLoading();
    }
  };

  return {
    handleUnsend,
  };
};
