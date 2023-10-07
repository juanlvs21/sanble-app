import { Camera, CameraResultType } from "@capacitor/camera";
import { IonNote, useIonAlert } from "@ionic/react";
import { FormikHelpers, useFormik } from "formik";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";

import { Button } from "@/components/common/buttons/Button";
import { TextArea } from "@/components/common/forms/TextArea";
import { base64StringToBlob } from "@/helpers/file";
import { getErrorMessage } from "@/helpers/getFormikErrorMsg";
import { postSchema } from "@/helpers/validator/posts";
import { useApp } from "@/hooks/useApp";
import { TPost, TPostForm } from "@/types/TPost";
import styles from "./PostForm.module.css";
import { useToast } from "@/hooks/useToast";

const dropMessageStyle = {
  backgroundColor: "var(--sanble-gray-color-1)",
  color: "var(--ion-color-secondary)",
  borderRadius: "var(--sanble-border-radius)",
};

export type ComponentProps = {
  /**
   * Handle save post
   */
  handleSave: (
    values: TPostForm,
    formikHelpers: FormikHelpers<TPostForm>
  ) => void | Promise<any>;
  /**
   * Post data for edit
   */
  post?: TPost;
  /**
   * Allowed file types in the file input
   *
   * @default ["jpg", "png", "jpeg"]
   */
  fileTypes?: String[];
  /**
   *  Text to be displayed in the file input
   *
   * @default "Suelte una imagen aquí"
   */
  fileHoverTitle?: string;
  /**
   * Maximum file size (Size in mb)
   *
   * @default 10
   */
  fileMaxSize?: number;
  /**
   * Post is loading
   */
  isLoading?: boolean;
  /**
   * Custom className component
   */
  className?: string;
};

export const PostForm = ({
  isLoading,
  handleSave,
  post,
  fileTypes = ["jpg", "png", "jpeg"],
  fileHoverTitle = "Suelte una imagen aquí",
  fileMaxSize = 10,
  className = "",
}: ComponentProps) => {
  const [presentAlert] = useIonAlert();
  const { toast } = useToast();
  const { isCapacitor } = useApp();
  const [errorFile, setErrorFile] = useState("");
  const [errorCamera, setErrorCamera] = useState(false);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    touched,
    errors,
    isSubmitting,
  } = useFormik<TPostForm>({
    enableReinitialize: true,
    initialValues: {
      id: post?.id ?? undefined,
      text: post?.text ?? "",
      image: undefined,
    },
    validationSchema: postSchema,
    onSubmit: handleSave,
  });

  const handleChangeFile = (file: any) => {
    setFieldValue("image", file);
  };

  const handleFileErrorType = () =>
    setErrorFile(
      `Solo se permiten los archivos de tipo ${fileTypes.join(", ")}`
    );
  const handleFileErrorSize = () =>
    setErrorFile(`Solo se permiten archivos de ${fileMaxSize}mb máximo`);

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

        setFieldValue("image", file);
      }
    } catch (error) {
      console.error({ error });
      setErrorCamera(false);
    }
  };

  const handleDeleteFile = () => {
    presentAlert({
      header: "¿Quiere eliminar la imagen?",
      buttons: [
        {
          text: "No",
          role: "cancel",
        },
        {
          text: "Si",
          role: "confirm",
          handler: () => {
            toast("La imagen ha sido eliminada", {
              type: "info",
            });
            setFieldValue("image", undefined);
          },
        },
      ],
    });
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.postForm} ${className}`}>
      <TextArea
        placeholder="¿Que quieres compartir?"
        name="text"
        onIonInput={handleChange}
        onIonBlur={handleBlur}
        disabled={isSubmitting || isLoading}
        value={values.text}
        helper={getErrorMessage("text", touched, errors)}
        className={styles.postFormInput}
        maxlength={500}
        helperIsError
      />

      <section className={`${styles.postFormFileContainer}`}>
        {isCapacitor ? (
          <>
            <div
              className={styles.postFormFileContainer}
              onClick={handleOpenCamera}
            >
              <div className={`${styles.postFormFile}`}>
                {post?.fileUrl && !values.image && (
                  <img
                    src={post?.fileUrl}
                    alt="Imagen Actual"
                    className={styles.postFormOldImg}
                  />
                )}
                <MdOutlineAddPhotoAlternate size={32} />
                <div className={`${styles.postFormFileDescription}`}>
                  <p>
                    {values.image
                      ? (values.image as any).name
                      : "Elija una imagen de su Galería o use su Cámara"}
                  </p>
                </div>
              </div>
            </div>
            <IonNote className={styles.postFormFileError}>
              {errorCamera ? "" : ""}
            </IonNote>
          </>
        ) : (
          <>
            <FileUploader
              name="image"
              hoverTitle={fileHoverTitle}
              onTypeError={handleFileErrorType}
              onSizeError={handleFileErrorSize}
              onSelect={() => setErrorFile("")}
              handleChange={handleChangeFile}
              types={fileTypes}
              photoFormFileContainer
              dropMessageStyle={dropMessageStyle}
              maxSize={fileMaxSize}
            >
              <div
                style={{
                  pointerEvents: "none",
                }}
              >
                <div className={`${styles.postFormFile}`}>
                  {post?.fileUrl && !values.image && (
                    <img
                      src={post?.fileUrl}
                      alt="Imagen Actual"
                      className={styles.postFormOldImg}
                    />
                  )}
                  <MdOutlineAddPhotoAlternate size={32} />
                  <div className={`${styles.postFormFileDescription}`}>
                    <p>
                      {values.image
                        ? (values.image as any).name
                        : "Haga clic o arrastre y suelte una imagen aquí"}
                    </p>
                    <small>
                      {values.image
                        ? "Haga clic o arrastre y suelte una imagen aquí para reemplazar por otra"
                        : `Máximo ${fileMaxSize}mb | Tipos de archivos permitidos ${fileTypes.join(
                            ", "
                          )}`}
                    </small>
                  </div>
                </div>
              </div>
            </FileUploader>
            <IonNote className={styles.postFormFileError}>
              {errorFile
                ? errorFile
                : getErrorMessage("image", touched, errors) &&
                  getErrorMessage("image", touched, errors)}
            </IonNote>
          </>
        )}

        {values.image && (
          <div
            className={`animate__animated animate__fadeIn ${styles.postFormFileDeleteBtnContainer}`}
          >
            <Button
              type="button"
              fill="outline"
              color="danger"
              size="small"
              className={styles.postFormFileDeleteBtn}
              onClick={handleDeleteFile}
            >
              <HiOutlineTrash size={18} />
            </Button>
          </div>
        )}
        {post?.fileUrl && (
          <IonNote className={styles.postFormFileInfo}>
            La nueva fotografía reemplazará a la anterior
          </IonNote>
        )}
      </section>

      <Button
        expand="block"
        color="primary"
        type="submit"
        disabled={isLoading}
        isLoading={isSubmitting || isLoading}
      >
        Guardar
      </Button>
    </form>
  );
};
