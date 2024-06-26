import { useIonLoading } from "@ionic/react";

import { useToast } from "@/hooks/useToast";
import { declineInvitationRequest } from "@/services/invitation";

export type TUseInvitationDecline = {
  handleReload: () => Promise<void>;
};

export const useInvitationDecline = ({
  handleReload,
}: TUseInvitationDecline) => {
  const [presentLoading, dismissLoading] = useIonLoading();
  const { toast } = useToast();

  const handleDecline = async (invitationId: string) => {
    try {
      presentLoading();

      await declineInvitationRequest(invitationId);

      toast("Invitación rechazada", { type: "success" });

      await handleReload();
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      dismissLoading();
    }
  };

  return {
    handleDecline,
  };
};
