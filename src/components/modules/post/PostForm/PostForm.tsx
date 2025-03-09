import { Camera, CameraResultType } from "@capacitor/camera";
import { IonNote, useIonAlert } from "@ionic/react";
import { useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Controller, UseFormReset, useForm } from "react-hook-form";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

import { Button } from "@/components/common/buttons/Button";
import { TextArea } from "@/components/common/forms/TextArea";
import { base64StringToBlob } from "@/helpers/file";
import { postSchema } from "@/helpers/validator/posts";
import { useApp } from "@/hooks/useApp";
import { useToast } from "@/hooks/useToast";
import { TPost, TPostForm } from "@/types/TPost";
import styles from "./PostForm.module.css";

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
    reset: UseFormReset<TPostForm>
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
  const formRef = useRef<HTMLFormElement>(null);
  const [errorFile, setErrorFile] = useState("");
  const [errorCamera, setErrorCamera] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TPostForm>({
    values: {
      id: post?.id ?? undefined,
      text: post?.text ?? "",
      image: undefined,
    },
    resolver: postSchema,
  });

  const handleChangeFile = (file: any) => {
    setValue("image", file);
  };

  const handleFileErrorType = () =>
    setErrorFile(
      `Solo se permiten los archivos de tipo ${fileTypes.join(", ")}`
    );
  const handleFileErrorSize = () =>
    setErrorFile(`Solo se permiten archivos de ${fileMaxSize}mb máximo`);

  const handleOpenCamera = async () => {
    try {
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

      setValue("image", file);
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
            setValue("image", undefined);
          },
        },
      ],
    });
  };

  const valueImage = watch("image");

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit((values) => handleSave(values, reset))}
      onKeyUp={(e) => e.key === "Enter" && formRef.current?.requestSubmit()}
      className={`${styles.postForm} ${className}`}
    >
      <Controller
        control={control}
        name="text"
        render={({
          field: { onChange, onBlur, ...field },
          fieldState: { error },
        }) => (
          <TextArea
            placeholder="¿Que quieres compartir?"
            onIonInput={onChange}
            onIonBlur={onBlur}
            disabled={isSubmitting || isLoading}
            helper={error?.message}
            className={styles.postFormInput}
            maxlength={500}
            helperIsError
            {...field}
          />
        )}
      />

      <section className={`${styles.postFormFileContainer}`}>
        {isCapacitor ? (
          <>
            <div
              className={styles.postFormFileContainer}
              onClick={handleOpenCamera}
            >
              <div className={`${styles.postFormFile}`}>
                {post?.fileUrl && !valueImage && (
                  <img
                    src={post?.fileUrl}
                    alt="Imagen Actual"
                    className={styles.postFormOldImg}
                  />
                )}
                <MdOutlineAddPhotoAlternate size={32} />
                <div className={`${styles.postFormFileDescription}`}>
                  <p>
                    {valueImage
                      ? (valueImage as any).name
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
                  {post?.fileUrl && !valueImage && (
                    <img
                      src={post?.fileUrl}
                      alt="Imagen Actual"
                      className={styles.postFormOldImg}
                    />
                  )}
                  <MdOutlineAddPhotoAlternate size={32} />
                  <div className={`${styles.postFormFileDescription}`}>
                    <p>
                      {valueImage
                        ? (valueImage as any).name
                        : "Haga clic o arrastre y suelte una imagen aquí"}
                    </p>
                    <small>
                      {valueImage
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
                : errors.image?.message && errors.image?.message}
            </IonNote>
          </>
        )}

        {valueImage && (
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
