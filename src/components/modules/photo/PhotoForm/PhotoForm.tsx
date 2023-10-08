import { Camera, CameraResultType } from "@capacitor/camera";
import { IonCheckboxCustomEvent } from "@ionic/core";
import { CheckboxChangeEventDetail, IonNote } from "@ionic/react";
import { useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Controller, UseFormReset, useForm } from "react-hook-form";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

import { Button } from "@/components/common/buttons/Button";
import { Checkbox } from "@/components/common/forms/Checkbox";
import { TextArea } from "@/components/common/forms/TextArea";
import { base64StringToBlob } from "@/helpers/file";
import { photoSchema } from "@/helpers/validator/photo";
import { useApp } from "@/hooks/useApp";
import { TPhotograph, TPhotographForm } from "@/types/TPhotograph";
import styles from "./PhotoForm.module.css";

const dropMessageStyle = {
  backgroundColor: "var(--sanble-gray-color-1)",
  color: "var(--ion-color-secondary)",
  borderRadius: "var(--sanble-border-radius)",
};

export type ComponentProps = {
  /**
   * Previous information of the photo (In case of photo editing)
   */
  photo?: TPhotograph;
  /**
   * Handle save photo
   */
  handleSave: (
    values: TPhotographForm,
    reset: UseFormReset<TPhotographForm>
  ) => void | Promise<void>;
  /**
   * Allowed file types in the file input
   *
   * @default ["jpg", "png", "jpeg"]
   */
  fileTypes?: String[];
  /**
   *  Text to be displayed in the file input
   *
   * @default "Suelte una fotografía aquí"
   */
  fileHoverTitle?: string;
  /**
   * Maximum file size (Size in mb)
   *
   * @default 10
   */
  fileMaxSize?: number;
  /**
   * Form Loading
   */
  isLoading?: boolean;
  /**
   * Custom className for form component
   */
  className?: string;
};

export const PhotoForm = ({
  photo,
  isLoading,
  handleSave,
  className = "",
  fileTypes = ["jpg", "png", "jpeg"],
  fileHoverTitle = "Suelte una fotografía aquí",
  fileMaxSize = 10,
}: ComponentProps) => {
  const { isCapacitor } = useApp();
  const formRef = useRef<HTMLFormElement>(null);
  const [errorFile, setErrorFile] = useState("");
  const [errorCamera, setErrorCamera] = useState(false);
  const [reviewSrc, setReviewSrc] = useState(photo?.url ?? "");
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<TPhotographForm>({
    values: {
      id: photo?.id ?? "",
      description: photo?.description ?? "",
      image: "",
      isCover: photo?.isCover || false,
    },
    resolver: photoSchema,
  });

  const handleChangeCheck = (
    event: IonCheckboxCustomEvent<CheckboxChangeEventDetail>
  ) => setTimeout(() => setValue("isCover", event.detail.checked), 100);

  const handleChangeFile = (file: any) => {
    setReviewSrc("");
    setValue("image", file);
    setTimeout(() => setReviewSrc(URL.createObjectURL(file)), 100);
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

        setValue("image", file);
        setReviewSrc(URL.createObjectURL(blob));
      }
    } catch (error) {
      console.error({ error });
      setErrorCamera(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit((values) => handleSave(values, reset))}
      onKeyUp={(e) => e.key === "Enter" && formRef.current?.requestSubmit()}
      className={`${styles.photoFormContainer} ${className}`}
    >
      {!photo && (
        <section className={`${styles.photoFormFileSection}`}>
          {isCapacitor ? (
            <>
              <div
                className={styles.photoFormFileContainer}
                style={{
                  backgroundImage: reviewSrc ? `url("${reviewSrc}")` : "",
                }}
                onClick={handleOpenCamera}
              >
                <div
                  className={`${styles.photoFormFile} ${
                    isCapacitor ? styles.isCapacitor : ""
                  }`}
                  style={{
                    color: reviewSrc
                      ? "var(--ion-color-light)"
                      : "var(--sanble-gray-color-1)",
                    padding: 20,
                  }}
                >
                  <MdOutlineAddPhotoAlternate size={52} />
                  <p>Elija una fotografía de su Galería o use su Cámara</p>
                </div>
              </div>
              <IonNote className={styles.photoFormFileError}>
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
                  className={styles.photoFormFileContainer}
                  style={{
                    backgroundImage: reviewSrc ? `url("${reviewSrc}")` : "",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    className={`${styles.photoFormFile} ${
                      isCapacitor ? styles.isCapacitor : ""
                    }`}
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
              <IonNote className={styles.photoFormFileError}>
                {errorFile
                  ? errorFile
                  : errors.image?.message && errors.image?.message}
              </IonNote>
            </>
          )}
        </section>
      )}
      <section>
        <Controller
          control={control}
          name="description"
          render={({
            field: { onChange, onBlur, ...field },
            fieldState: { error },
          }) => (
            <TextArea
              placeholder="Descripción"
              onIonInput={onChange}
              onIonBlur={onBlur}
              disabled={isSubmitting}
              maxlength={500}
              className={styles.photoFormTextarea}
              helper={error?.message}
              helperIsError
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="isCover"
          render={({
            field: { onBlur, value, ...field },
            fieldState: { error },
          }) => (
            <Checkbox
              label="Fotografía de perfil"
              onIonChange={handleChangeCheck}
              onIonBlur={onBlur}
              disabled={isSubmitting}
              checked={Boolean(value)}
              helper={error?.message}
              helperIsError
              {...field}
            />
          )}
        />
        <Button
          expand="block"
          color="primary"
          type="submit"
          isLoading={isSubmitting || isLoading}
          className={styles.photoFormBtn}
        >
          {photo ? "Editar" : "Publicar"}
        </Button>
      </section>
    </form>
  );
};
