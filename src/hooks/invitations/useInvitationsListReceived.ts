import { useSWRLists } from "@/hooks/useSWRLists";
import { getInvitationsReceivedRequest } from "@/services/invitation";
import { TInvitation } from "@/types/TInvitation";

export const useInvitationsListReceived = () => {
  const { list, ...listProps } = useSWRLists<TInvitation>(
    "/invitations/received",
    getInvitationsReceivedRequest
  );

  return {
    list,
    ...listProps,
  };
};
