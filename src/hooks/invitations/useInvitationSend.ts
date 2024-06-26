import { sendInvitationRequest } from "@/services/invitation";
import { TInvitationForm } from "@/types/TInvitation";
import { useToast } from "@/hooks/useToast";
import { useIonLoading } from "@ionic/react";

export const useInvitationSend = (fnCallback: () => Promise<void>) => {
  const [presentLoading, dismissLoading] = useIonLoading();
  const { toast } = useToast();

  const handleSendInvitation = async (data: TInvitationForm) => {
    try {
      presentLoading();

      await sendInvitationRequest(data);

      toast("Invitación enviada", { type: "success" });

      await fnCallback();
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      dismissLoading();
    }
  };

  return {
    handleSendInvitation,
  };
};
