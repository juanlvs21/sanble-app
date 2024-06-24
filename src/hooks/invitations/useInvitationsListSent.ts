import { useSWRLists } from "@/hooks/useSWRLists";
import { getInvitationsSentRequest } from "@/services/invitation";
import { TInvitation } from "@/types/TInvitation";

export const useInvitationsListSent = () => {
  const { list, ...listProps } = useSWRLists<TInvitation>(
    "/invitations/sent",
    getInvitationsSentRequest
  );

  return {
    list,
    ...listProps,
  };
};
