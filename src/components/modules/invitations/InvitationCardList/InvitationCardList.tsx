import { EInvitationType, TInvitation } from "@/types/TInvitation";
import { useIonAlert } from "@ionic/react";
import { useMemo } from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

import { ImageExtended } from "@/components/common/ImageExtended";
import { Button } from "@/components/common/buttons/Button";
import styles from "./InvitationCardList.module.css";

export type ComponentProps = {
  /**
   * Invitation
   */
  invitation: TInvitation;
  /**
   * Accept invitation function
   */
  handleAccept: (invitationId: string) => Promise<void>;
  /**
   * Cancel invitation function
   */
  handleCancel: (invitationId: string) => Promise<void>;
  /**
   * Sent by me
   */
  sentByMe?: boolean;
};

export const InvitationCardList = ({
  invitation,
  handleAccept,
  handleCancel,
  sentByMe,
}: ComponentProps) => {
  const [presentAlert] = useIonAlert();

  const invitationFrom = useMemo(() => {
    if (sentByMe) {
      return invitation.type === EInvitationType.FAIR_REQUEST
        ? invitation.fair
        : invitation.stand;
    }

    return invitation.type === EInvitationType.FAIR_REQUEST
      ? invitation.stand
      : invitation.fair;
  }, [invitation, sentByMe]);

  const invitationTo = useMemo(() => {
    if (sentByMe) {
      return invitation.type === EInvitationType.FAIR_REQUEST
        ? invitation.stand
        : invitation.fair;
    }

    return invitation.type === EInvitationType.FAIR_REQUEST
      ? invitation.fair
      : invitation.stand;
  }, [invitation, sentByMe]);

  const handleOpenConfirm = () => {
    presentAlert({
      header: sentByMe ? "Cancelar Invitiación" : "Rechazar Invitación",
      message: sentByMe
        ? "¿Estás seguro de que deseas cancelar la invitación?"
        : "¿Estás seguro de que deseas rechazar la invitación?",
      buttons: [
        {
          text: "Cerrar",
          role: "cancel",
        },
        {
          text: "Confirmar",
          role: "confirm",
          handler: () => handleCancel(invitation.id),
        },
      ],
    });
  };

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
          {!sentByMe && (
            <>
              {invitation.type === EInvitationType.FAIR_REQUEST && (
                <>
                  <h1>Solicitud de invitación</h1>
                  <p>
                    El Stand <b>{invitationFrom.name}</b> está solicitando
                    formar parte de tu Feria <b>{invitationTo.name}</b>
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
            </>
          )}

          {sentByMe && (
            <>
              {invitation.type === EInvitationType.FAIR_REQUEST && (
                <>
                  <h1>Solicitud de invitación</h1>
                  <p>
                    Solicitaste formar parte de la Feria
                    <b> {invitationFrom.name}</b> con tu Stant
                    <b> {invitationTo.name}</b>
                  </p>
                </>
              )}
              {invitation.type === EInvitationType.STAND_INVITATION && (
                <>
                  <h1>Invitación enviada</h1>
                  <p>
                    Haz invitado al stand <b>{invitationFrom.name}</b> a formar
                    parte de tu feria Feria <b>{invitationTo.name}</b>
                  </p>
                </>
              )}
            </>
          )}

          <div className={styles.invitationCardBtns}>
            <Button
              color="danger"
              className={styles.invitationCardBtn}
              onClick={handleOpenConfirm}
            >
              <IoMdClose size={24} />
            </Button>
            {!sentByMe && (
              <Button
                className={styles.invitationCardBtn}
                onClick={() => handleAccept(invitation.id)}
              >
                <IoMdCheckmark size={24} />
              </Button>
            )}
          </div>
        </div>
      </article>
    )
  );
};
