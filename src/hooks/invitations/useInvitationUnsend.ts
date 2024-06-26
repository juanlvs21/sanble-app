import { useIonLoading } from "@ionic/react";

import { useToast } from "@/hooks/useToast";
import { unsendInvitationRequest } from "@/services/invitation";

export type TUseInvitationUnsend = {
  handleRefresh: () => Promise<void>;
};

export const useInvitationUnsend = ({
  handleRefresh,
}: TUseInvitationUnsend) => {
  const [presentLoading, dismissLoading] = useIonLoading();
  const { toast } = useToast();

  const handleUnsend = async (invitationId: string) => {
    try {
      presentLoading();

      await unsendInvitationRequest(invitationId);

      toast("Inivitacion cancelada", { type: "success" });

      await handleRefresh();
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
