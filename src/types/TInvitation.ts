import { TFair } from "@/types/TFair";
import { TStand } from "./TStand";

export type TInvitationFormCard = {
  requestSent: boolean;
};

export type TInvitationFormFair = TFair & TInvitationFormCard;

export type TInvitationFormStand = TStand & TInvitationFormCard;

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
