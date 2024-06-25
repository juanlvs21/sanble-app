import { TFair } from "@/types/TFair";
import { TStand } from "./TStand";

export type TInvitationFormFair = TFair & {
  requestSent: boolean;
};

export type TInvitationFormStand = TStand & {
  invitationSent: boolean;
};

export enum EInvitationType {
  STAND_INVITATION = "STAND_INVITATION",
  FAIR_REQUEST = "FAIR_REQUEST",
}

export type TInvitationForm = {
  fairID: string;
  standID: string;
  type: EInvitationType;
  sentTo: string;
};

export type TInvitation = {
  id: string;
  type: EInvitationType;
  fairID: string;
  standID: string;
  sentBy: string;
  sentTo: string;
  creationTime: string;
  fair: TFair;
  stand: TStand;
  fairOwner: {
    id: string;
    name: string;
  };
  standOwner: {
    id: string;
    name: string;
  };
};
