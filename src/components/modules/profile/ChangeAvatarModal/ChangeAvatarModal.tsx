import { Camera, CameraResultType } from "@capacitor/camera";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonNote,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

import { Button } from "@/components/common/buttons/Button";
import { base64StringToBlob } from "@/helpers/file";
import { TChangeAvatarHook } from "@/hooks/profile/useChangeAvatar";
import { useApp } from "@/hooks/useApp";
import styles from "./ChangeAvatarModal.module.css";

const fileMaxSize = 10;
const fileTypes = ["jpg", "png", "jpeg"];

const dropMessageStyle = {
  backgroundColor: "var(--sanble-gray-color-1)",
  color: "var(--ion-color-secondary)",
  borderRadius: "var(--sanble-border-radius)",
};

export type ComponentProps = TChangeAvatarHook;

export const ChangeAvatarModal = ({
  isOpen,
  onOpen,
  handleSubmit,
}: ComponentProps) => {
  const { isCapacitor } = useApp();
  const [errorFile, setErrorFile] = useState("");
  const [errorCamera, setErrorCamera] = useState(false);
  const [reviewSrc, setReviewSrc] = useState("");
  const [file, setFile] = useState<File>();

  const handleOpenCamera = async () => {
    try {
      const permissions = await Camera.requestPermissions();

      if (
        permissions.photos === "granted" &&
        permissions.camera === "granted"
      ) {
        const image = await Camera.getPhoto({
          quality: 100,
          resultType: CameraResultType.Base64,
          promptLabelHeader: "Seleccionar imagen",
          promptLabelPicture: "Usar Cámara",
          promptLabelPhoto: "Usar Galería",
          promptLabelCancel: "Cancelar",
          saveToGallery: true,
        });

        const time = new Date().getTime();

        const blob = base64StringToBlob(image.base64String ?? "");

        const file = new File([blob], `${time}.${image.format}`, {
          lastModified: time,
          type: blob.type,
        });

        setFile(file);
        setReviewSrc(URL.createObjectURL(blob));
      }
    } catch (error) {
      console.error({ error });
      setErrorCamera(false);
    }
  };

  const handleChangeFile = (file: any) => {
    setReviewSrc("");
    setFile(file);
    setTimeout(() => setReviewSrc(URL.createObjectURL(file)), 100);
  };

  const handleFileErrorSize = () =>
    setErrorFile(`Solo se permiten archivos de ${fileMaxSize}mb máximo`);

  useEffect(() => {
    if (!isOpen) {
      setErrorFile("");
      setErrorCamera(false);
      setReviewSrc("");
      setFile(undefined);
    }
  }, [isOpen]);

  return (
    <IonModal isOpen={isOpen} backdropDismiss={false}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <Button onClick={() => onOpen(false)}>Cerrar</Button>
          </IonButtons>
          <IonTitle>Cambiar Fotografía de Perfil</IonTitle>
          <IonButtons slot="end">
            <Button strong={true} onClick={() => handleSubmit(file)}>
              Guardar
            </Button>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <section className={`${styles.avatarSection}`}>
          {isCapacitor ? (
            <>
              <div
                className={styles.avatarFileContainer}
                style={{
                  backgroundImage: reviewSrc ? `url("${reviewSrc}")` : "",
                }}
                onClick={handleOpenCamera}
              >
                <div>
                  <MdOutlineAddPhotoAlternate size={52} />
                  <p>Elija una fotografía de su Galería o use su Cámara</p>
                </div>
              </div>
              <IonNote>{errorCamera ? "" : ""}</IonNote>
            </>
          ) : (
            <>
              <FileUploader
                name="image"
                hoverTitle="Suelte una fotografía aquí"
                onTypeError={fileTypes}
                onSizeError={handleFileErrorSize}
                onSelect={() => setErrorFile("")}
                handleChange={handleChangeFile}
                types={fileTypes}
                photoFormFileContainer
                dropMessageStyle={dropMessageStyle}
                maxSize={fileMaxSize}
              >
                <div
                  className={styles.photoFormFileContainer}
                  style={{
                    backgroundImage: reviewSrc ? `url("${reviewSrc}")` : "",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      color: reviewSrc
                        ? "var(--ion-color-light)"
                        : "var(--sanble-gray-color-1)",
                    }}
                  >
                    <MdOutlineAddPhotoAlternate size={52} />
                    <p>Haga clic o arrastre y suelte una fotografía aquí</p>
                    <small>
                      Máximo {fileMaxSize}mb | Tipos de archivos permitidos{" "}
                      {fileTypes.join(", ")}
                    </small>
                  </div>
                </div>
              </FileUploader>
              <IonNote>{errorFile ? errorFile : ""}</IonNote>
            </>
          )}
        </section>
      </IonContent>
    </IonModal>
  );
};
