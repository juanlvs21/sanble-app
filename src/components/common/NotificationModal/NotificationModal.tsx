import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router";
import { IoIosClose } from "react-icons/io";

import styles from "./NotificationModal.module.css";
import { isDesktop } from "@/utils/isDesktop";

type ComponentProps = {
  /**
   * Is open Modal
   */
  isOpen: boolean;
  /**
   * Callback to handle show Modal
   */
  onClose?: () => void;
};

const NOTIFICATION_EXAMPLE = [
  {
    id: 1,
    title: "Notificación ejemplo 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea, repellat, possimus suscipit molestias temporibus, distinctio molestiae at perferendis omnis accusantium voluptates corporis? Asperiores nam eaque nostrum ipsum laborum fugiat.",
    read: true,
  },
  {
    id: 2,
    title: "Notificación ejemplo 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea, repellat, possimus suscipit molestias temporibus, distinctio molestiae at perferendis omnis accusantium voluptates corporis? Asperiores nam eaque nostrum ipsum laborum fugiat.",
    read: true,
  },
  {
    id: 3,
    title: "Notificación ejemplo 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea, repellat, possimus suscipit molestias temporibus, distinctio molestiae at perferendis omnis accusantium voluptates corporis? Asperiores nam eaque nostrum ipsum laborum fugiat.",
    read: true,
  },
  {
    id: 4,
    title: "Notificación ejemplo 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea, repellat, possimus suscipit molestias temporibus, distinctio molestiae at perferendis omnis accusantium voluptates corporis? Asperiores nam eaque nostrum ipsum laborum fugiat.",
    read: false,
  },
  {
    id: 5,
    title: "Notificación ejemplo 5",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea, repellat, possimus suscipit molestias temporibus, distinctio molestiae at perferendis omnis accusantium voluptates corporis? Asperiores nam eaque nostrum ipsum laborum fugiat.",
    read: false,
  },
  {
    id: 6,
    title: "Notificación ejemplo 6",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea, repellat, possimus suscipit molestias temporibus, distinctio molestiae at perferendis omnis accusantium voluptates corporis? Asperiores nam eaque nostrum ipsum laborum fugiat.",
    read: false,
  },
  {
    id: 7,
    title: "Notificación ejemplo 7",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea, repellat, possimus suscipit molestias temporibus, distinctio molestiae at perferendis omnis accusantium voluptates corporis? Asperiores nam eaque nostrum ipsum laborum fugiat.",
    read: false,
  },
  {
    id: 8,
    title: "Notificación ejemplo 8",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea, repellat, possimus suscipit molestias temporibus, distinctio molestiae at perferendis omnis accusantium voluptates corporis? Asperiores nam eaque nostrum ipsum laborum fugiat.",
    read: false,
  },
  {
    id: 9,
    title: "Notificación ejemplo 9",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea, repellat, possimus suscipit molestias temporibus, distinctio molestiae at perferendis omnis accusantium voluptates corporis? Asperiores nam eaque nostrum ipsum laborum fugiat.",
    read: false,
  },
  {
    id: 10,
    title: "Notificación ejemplo 10",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea, repellat, possimus suscipit molestias temporibus, distinctio molestiae at perferendis omnis accusantium voluptates corporis? Asperiores nam eaque nostrum ipsum laborum fugiat.",
    read: false,
  },
  {
    id: 11,
    title: "Notificación ejemplo 11",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea, repellat, possimus suscipit molestias temporibus, distinctio molestiae at perferendis omnis accusantium voluptates corporis? Asperiores nam eaque nostrum ipsum laborum fugiat.",
    read: false,
  },
  {
    id: 12,
    title: "Notificación ejemplo 12",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea, repellat, possimus suscipit molestias temporibus, distinctio molestiae at perferendis omnis accusantium voluptates corporis? Asperiores nam eaque nostrum ipsum laborum fugiat.",
    read: false,
  },
  {
    id: 13,
    title: "Notificación ejemplo 13",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea, repellat, possimus suscipit molestias temporibus, distinctio molestiae at perferendis omnis accusantium voluptates corporis? Asperiores nam eaque nostrum ipsum laborum fugiat.",
    read: false,
  },
  {
    id: 14,
    title: "Notificación ejemplo 14",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea, repellat, possimus suscipit molestias temporibus, distinctio molestiae at perferendis omnis accusantium voluptates corporis? Asperiores nam eaque nostrum ipsum laborum fugiat.",
    read: false,
  },
  {
    id: 15,
    title: "Notificación ejemplo 15",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea, repellat, possimus suscipit molestias temporibus, distinctio molestiae at perferendis omnis accusantium voluptates corporis? Asperiores nam eaque nostrum ipsum laborum fugiat.",
    read: false,
  },
];

export const NotificationModal: React.FC<ComponentProps> = ({
  isOpen,
  onClose = () => {},
}) => {
  const { push } = useHistory();

  const handleNavigateNotification = (id: number) => {
    onClose();
    push(`/notificacion/${id}`);
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      initialBreakpoint={isDesktop() ? undefined : 0.87}
      breakpoints={isDesktop() ? undefined : [0, 0.87]}
      className={styles.modal}
    >
      <IonContent className={styles.content}>
        <header className={styles.header}>
          <IonText>
            <h4>Notificaciones</h4>
          </IonText>
          <IonButton
            slot="end"
            fill="clear"
            color="dark"
            className={styles.closeBtn}
            onClick={onClose}
          >
            <IoIosClose size={32} />
          </IonButton>
        </header>
        <IonList className={styles.list}>
          {NOTIFICATION_EXAMPLE.map((item) => (
            <IonItem
              key={item.id}
              onClick={() => handleNavigateNotification(item.id)}
              className={`${styles.item} ${
                item.read ? styles.readNotification : ""
              } animate__animated animate__fadeIn`}
            >
              <IonLabel className={styles.itemTitle}>{item.title}</IonLabel>
              <IonLabel className={styles.itemLabel}>
                {item.description}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};
