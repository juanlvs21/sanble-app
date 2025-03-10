import { Link } from "react-router-dom";

import { TInvitationFormFair, TInvitationFormStand } from "@/types/TInvitation";

import { ImageExtended } from "@/components/common/ImageExtended";
import { Stars } from "@/components/common/Stars";
import { Button } from "@/components/common/buttons/Button";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./InvitationCard.module.css";

export type ComponentProps = {
  /**
   * Fair Details
   */
  fair?: TInvitationFormFair;
  /**
   * Stand Details
   */
  stand?: TInvitationFormStand;
  /**
   * Send invitation function
   */
  handleSendInvitation: () => Promise<void>;
  /**
   * Send invitation function
   */
  handleUnsendInvitation: (invitationId: string) => Promise<void>;
  /**
   *  Go back url details
   */
  goBackUrl?: string;
};

export const InvitationCard = ({
  fair,
  stand,
  goBackUrl,
  handleSendInvitation,
  handleUnsendInvitation,
}: ComponentProps) => {
  const linkDetails = fair
    ? `${ERoutesName.FAIRS_LIST}/${fair.id}`
    : `${ERoutesName.STANDS_LIST}/${stand?.id}`;

  const requestSent = fair?.requestSent || stand?.invitationSent;
  const invitationId = fair?.invitationId || stand?.invitationId;

  if (fair || stand)
    return (
      <article
        className={`animate__animated animate__fadeIn ${styles.invitationCard}`}
      >
        <Link
          to={linkDetails}
          state={{
            fairID: fair?.id,
            fairName: fair?.name,
            standID: stand?.id,
            standName: stand?.name,
            goBackUrl,
          }}
          className={styles.invitationCardLink}
        >
          <ImageExtended
            src={fair?.coverUrl}
            alt={fair?.name}
            classNamePicture={styles.invitationCardPicture}
            className={styles.invitationCardImg}
            skeletonProps={{
              className: styles.invitationCardImg,
            }}
          />
          <div className={styles.invitationCardContent}>
            <h1>{fair ? fair.name : stand?.name}</h1>
            <Stars value={fair ? fair.stars : stand?.stars} />
          </div>
        </Link>

        <Button
          color={requestSent ? "danger" : "primary"}
          expand="full"
          className={styles.invitationCardBtn}
          onClick={
            invitationId
              ? () => handleUnsendInvitation(invitationId)
              : handleSendInvitation
          }
        >
          {fair
            ? fair.requestSent
              ? "Cancelar Invitación"
              : "Enviar Invitación"
            : stand?.invitationSent
            ? "Cancelar Solicitud"
            : "Enviar Solicitud"}
        </Button>
      </article>
    );

  return null;
};
