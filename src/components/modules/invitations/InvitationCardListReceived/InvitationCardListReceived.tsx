import { EInvitationType, TInvitation } from "@/types/TInvitation";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

import { ImageExtended } from "@/components/common/ImageExtended";
import { Button } from "@/components/common/buttons/Button";
import styles from "./InvitationCardListReceived.module.css";

export type ComponentProps = {
  /**
   * Invitation
   */
  invitation: TInvitation;
  /**
   * Accept invitation function
   */
  handleAccept: () => Promise<void>;
  /**
   * Cancel invitation function
   */
  handleCancel: () => Promise<void>;
};

export const InvitationCardListReceived = ({ invitation }: ComponentProps) => {
  const invitationFrom =
    invitation.type === EInvitationType.FAIR_REQUEST
      ? invitation.stand
      : invitation.fair;
  const invitationTo =
    invitation.type === EInvitationType.FAIR_REQUEST
      ? invitation.fair
      : invitation.stand;

  return (
    invitation && (
      <article
        className={`animate__animated animate__fadeIn ${styles.invitationCard}`}
      >
        <ImageExtended
          src={invitationFrom.coverUrl}
          alt={invitationFrom.name}
          classNamePicture={styles.invitationCardPicture}
          className={styles.invitationCardImg}
          skeletonProps={{
            className: styles.invitationCardImg,
          }}
        />
        <div className={styles.invitationCardContent}>
          {invitation.type === EInvitationType.FAIR_REQUEST && (
            <>
              <h1>Solicitud de invitación</h1>
              <p>
                El Stand <b>{invitationFrom.name}</b> está solicitando formar
                parte de tu Feria <b>{invitationTo.name}</b>
              </p>
            </>
          )}
          {invitation.type === EInvitationType.STAND_INVITATION && (
            <>
              <h1>Invitación a Feria</h1>
              <p>
                La Feria <b>{invitationFrom.name}</b> ha invitado a tu Stand
                <b> {invitationTo.name}</b> a formar parte de su evento
              </p>
            </>
          )}

          <div className={styles.invitationCardBtns}>
            <Button color="danger" className={styles.invitationCardBtn}>
              <IoMdClose size={24} />
            </Button>
            <Button className={styles.invitationCardBtn}>
              <IoMdCheckmark size={24} />
            </Button>
          </div>
        </div>
      </article>
    )
  );
};
