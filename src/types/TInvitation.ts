import { TFair } from "@/types/TFair";
import { TStand } from "./TStand";

export type TInvitationForm = {
  requestSent: boolean;
};

export type TInvitationFormFair = TFair & TInvitationForm;

export type TInvitationFormStand = TStand & TInvitationForm;
