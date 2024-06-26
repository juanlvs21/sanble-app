import { useIonLoading } from "@ionic/react";

import { useToast } from "@/hooks/useToast";
import { declineInvitationRequest } from "@/services/invitation";

export type TUseInvitationDecline = {
  handleRefresh: () => Promise<void>;
};

export const useInvitationDecline = ({
  handleRefresh,
}: TUseInvitationDecline) => {
  const [presentLoading, dismissLoading] = useIonLoading();
  const { toast } = useToast();

  const handleDecline = async (invitationId: string) => {
    try {
      presentLoading();

      await declineInvitationRequest(invitationId);

      toast("Invitación rechazada", { type: "success" });

      await handleRefresh();
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
