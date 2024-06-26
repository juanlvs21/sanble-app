import { useIonLoading } from "@ionic/react";

import { useToast } from "@/hooks/useToast";
import { acceptInvitationRequest } from "@/services/invitation";

export type TUseInvitationAccept = {
  handleReload: () => Promise<void>;
};

export const useInvitationAccept = ({ handleReload }: TUseInvitationAccept) => {
  const [presentLoading, dismissLoading] = useIonLoading();
  const { toast } = useToast();

  const handleAccept = async (invitationId: string) => {
    try {
      presentLoading();

      await acceptInvitationRequest(invitationId);

      toast("Invitación aceptada", { type: "success" });

      await handleReload();
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      dismissLoading();
    }
  };

  return {
    handleAccept,
  };
};
