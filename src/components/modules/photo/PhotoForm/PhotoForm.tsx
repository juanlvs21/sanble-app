import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { IonCheckboxCustomEvent } from "@ionic/core";
import { CheckboxChangeEventDetail, IonNote } from "@ionic/react";
import { FormikHelpers, useFormik } from "formik";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

import { Button } from "@/components/common/buttons/Button";
import { Checkbox } from "@/components/common/forms/Checkbox";
import { TextArea } from "@/components/common/forms/TextArea";
import { base64StringToBlob } from "@/helpers/file";
import { getErrorMessage } from "@/helpers/getFormikErrorMsg";
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
    formikHelpers: FormikHelpers<TPhotographForm>
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
  const [errorFile, setErrorFile] = useState("");
  const [errorCamera, setErrorCamera] = useState(false);
  const [reviewSrc, setReviewSrc] = useState(photo?.url ?? "");
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    touched,
    errors,
    isSubmitting,
  } = useFormik<TPhotographForm>({
    enableReinitialize: true,
    initialValues: {
      id: photo?.id ?? "",
      description: photo?.description ?? "",
      image: "",
      isCover: photo?.isCover || false,
    },
    validationSchema: photoSchema,
    onSubmit: handleSave,
  });

  const handleChangeCheck = (
    event: IonCheckboxCustomEvent<CheckboxChangeEventDetail>
  ) => setTimeout(() => setFieldValue("isCover", event.detail.checked), 100);

  const handleChangeFile = (file: any) => {
    setReviewSrc("");
    setFieldValue("image", file);
    console.log({ file2: file });
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

        setFieldValue("image", file);
        setReviewSrc(URL.createObjectURL(blob));
      }
    } catch (error) {
      console.error({ error });
      setErrorCamera(false);
    }
  };

  return (
    <form
      className={`${styles.photoFormContainer} ${className}`}
      onSubmit={handleSubmit}
      onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
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
                  : getErrorMessage("image", touched, errors) &&
                    getErrorMessage("image", touched, errors)}
              </IonNote>
            </>
          )}
        </section>
      )}
      <section>
        <TextArea
          placeholder="Descripción"
          name="description"
          onIonInput={handleChange}
          onIonBlur={handleBlur}
          disabled={isSubmitting}
          value={values.description}
          helper={getErrorMessage("description", touched, errors)}
          maxlength={500}
          className={styles.photoFormTextarea}
          helperIsError
        />
        <Checkbox
          label="Fotografía de perfil"
          name="isCover"
          onIonChange={handleChangeCheck}
          onIonBlur={handleBlur}
          disabled={isSubmitting}
          checked={values.isCover}
          helper={getErrorMessage("isCover", touched, errors)}
          helperIsError
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
