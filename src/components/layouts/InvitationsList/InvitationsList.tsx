import { useMemo } from "react";
import { BsEnvelopeArrowDown, BsEnvelopeArrowUp } from "react-icons/bs";
import { Outlet, useLocation, useMatch } from "react-router-dom";

import { BottomBar } from "@/components/common/BottomBar";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./InvitationsList.module.css";

export const InvitationsList = () => {
  const { pathname } = useLocation();

  const matchInvitationsSent = useMatch(ERoutesName.INVITATIONS_SENT);
  const matchInvitationsReceived = useMatch(ERoutesName.INVITATIONS_RECEIVED);

  const items = useMemo(
    () => [
      {
        path: ERoutesName.INVITATIONS_RECEIVED,
        icon: <BsEnvelopeArrowDown size={26} />,
        active: matchInvitationsReceived,
      },
      {
        path: ERoutesName.INVITATIONS_SENT,
        icon: <BsEnvelopeArrowUp size={26} />,
        active: matchInvitationsSent,
      },
    ],
    [pathname]
  );

  return (
    <div className={`${styles.invitationsListContainer}`}>
      <section className={`${styles.invitationsListContent}`}>
        <Outlet />
      </section>
      <BottomBar items={items} />
    </div>
  );
};
