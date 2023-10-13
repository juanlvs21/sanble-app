import { Camera, CameraResultType } from "@capacitor/camera";
import {
  IonButtons,
  IonContent,
  IonModal,
  IonNote,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { useMaskito } from "@maskito/react";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Controller, useForm, UseFormReset } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

import { HeaderModal } from "@/components/common/HeaderModal";
import { Button } from "@/components/common/buttons/Button";
import { Input } from "@/components/common/forms/Input";
import { Select } from "@/components/common/forms/Select";
import { TextArea } from "@/components/common/forms/TextArea";
import { base64StringToBlob } from "@/helpers/file";
import { useApp } from "@/hooks/useApp";
import { useToast } from "@/hooks/useToast";

import { currencyMask } from "@/helpers/currencyMask";
import {
  EProductCurrency,
  EProductTypeKey,
  TProduct,
  TProductForm,
} from "@/types/TProduct";
import { IonSelectCustomEvent, SelectChangeEventDetail } from "@ionic/core";
import styles from "./ProductForm.module.css";

const dropMessageStyle = {
  backgroundColor: "var(--sanble-gray-color-1)",
  color: "var(--ion-color-secondary)",
  borderRadius: "var(--sanble-border-radius)",
};

const PRODUCT_TYPES: Record<EProductTypeKey, string> = {
  [EProductTypeKey.CLOTHES]: "Ropa",
  [EProductTypeKey.ACCESSORIES]: "Accesorio",
  [EProductTypeKey.DRINKS]: "Bebida",
  [EProductTypeKey.CANDIES]: "Dulce",
  [EProductTypeKey.FOODS]: "Comida",
};

export type ComponentProps = {
  /**
   * Show modal
   */
  showModal: boolean;
  /**
   * Toggle modal
   */
  toggleModal: () => void;
  /**
   * Handle save post
   */
  handleSave: (
    values: TProductForm,
    reset: UseFormReset<TProductForm>
  ) => void | Promise<any>;
  /**
   * Porduct data for edit
   */
  product?: TProduct;
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

export const ProductForm = ({
  showModal,
  isLoading,
  product,
  fileTypes = ["jpg", "png", "jpeg"],
  fileHoverTitle = "Agregar tu flyer imagen aquí",
  fileMaxSize = 10,
  className = "",
  toggleModal,
  handleSave,
}: ComponentProps) => {
  const [presentAlert] = useIonAlert();
  const { toast } = useToast();
  const { isCapacitor } = useApp();
  const [errorFile, setErrorFile] = useState("");
  const [errorCamera, setErrorCamera] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<TProductForm>({
    values: {
      id: product?.id ?? undefined,
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price ?? "",
      currency: product?.currency ?? EProductCurrency.BS,
      type: product?.type ?? undefined,
      image: undefined,
    },
    // resolver: postSchema, // TODO add validation
  });

  const valueImage = watch("image");

  const handleSetValueType = (
    e: IonSelectCustomEvent<SelectChangeEventDetail<EProductTypeKey>>
  ) => {
    setValue("type", e.detail.value);
  };

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
            setValue("image", undefined);
          },
        },
      ],
    });
  };

  const maskedCurrency = useMaskito({ options: currencyMask });

  useEffect(() => {
    if (showModal) reset();
  }, [showModal]);

  return (
    <IonModal isOpen={showModal}>
      <HeaderModal>
        <IonToolbar>
          <IonTitle>{product ? "Editar" : "Publicar"} Producto</IonTitle>
          <IonButtons slot="end">
            <Button
              onClick={() => toggleModal()}
              fill="clear"
              color="medium"
              className={styles.productFormModalClose}
            >
              <AiOutlineClose size={24} />
            </Button>
          </IonButtons>
        </IonToolbar>
      </HeaderModal>
      <IonContent className={styles.productFormModalContent}>
        <form
          onSubmit={handleSubmit((values) => handleSave(values, reset))}
          className={` ${className}`}
        >
          <section>
            <Controller
              control={control}
              name="name"
              render={({
                field: { onChange, onBlur, ...field },
                fieldState: { error },
              }) => (
                <Input
                  placeholder="Nombre del producto"
                  onIonInput={onChange}
                  onIonBlur={onBlur}
                  disabled={isSubmitting}
                  helper={error?.message}
                  helperIsError
                  {...field}
                />
              )}
            />
            <div className={styles.productFormPriceContainer}>
              <Controller
                control={control}
                name="currency"
                render={({
                  field: { onChange, onBlur, ...field },
                  fieldState: { error },
                }) => (
                  <Select
                    placeholder="Moneda"
                    inputMode="numeric"
                    interface="action-sheet"
                    onIonChange={onChange}
                    onIonBlur={onBlur}
                    helper={error?.message}
                    disabled={isSubmitting}
                    classNameItem={styles.productFormCurrency}
                    helperIsError
                    {...field}
                  >
                    <IonSelectOption value={EProductCurrency.BS}>
                      Bs.
                    </IonSelectOption>
                    <IonSelectOption value={EProductCurrency.USD}>
                      $
                    </IonSelectOption>
                  </Select>
                )}
              />

              <Controller
                control={control}
                name="price"
                render={({
                  field: { onChange, onBlur, ref, ...field },
                  fieldState: { error },
                }) => (
                  <Input
                    placeholder="Precio"
                    inputMode="numeric"
                    onIonInput={onChange}
                    onIonBlur={onBlur}
                    ref={async (inputRef) => {
                      if (inputRef) {
                        const input = await inputRef.getInputElement();
                        maskedCurrency(input);
                      }
                    }}
                    disabled={isSubmitting}
                    helper={error?.message}
                    helperIsError
                    {...field}
                  />
                )}
              />
            </div>

            <Controller
              control={control}
              name="type"
              render={({
                field: { onBlur, ...field },
                fieldState: { error },
              }) => (
                <Select
                  placeholder="Tipo de Producto"
                  interface="action-sheet"
                  onIonChange={handleSetValueType}
                  onIonBlur={onBlur}
                  helper={error?.message}
                  disabled={isSubmitting}
                  classNameItem={styles.productFormCurrency}
                  helperIsError
                  {...field}
                >
                  <IonSelectOption value={EProductTypeKey.CLOTHES}>
                    {PRODUCT_TYPES[EProductTypeKey.CLOTHES]}
                  </IonSelectOption>
                  <IonSelectOption value={EProductTypeKey.ACCESSORIES}>
                    {PRODUCT_TYPES[EProductTypeKey.ACCESSORIES]}
                  </IonSelectOption>
                  <IonSelectOption value={EProductTypeKey.DRINKS}>
                    {PRODUCT_TYPES[EProductTypeKey.DRINKS]}
                  </IonSelectOption>
                  <IonSelectOption value={EProductTypeKey.CANDIES}>
                    {PRODUCT_TYPES[EProductTypeKey.CANDIES]}
                  </IonSelectOption>
                  <IonSelectOption value={EProductTypeKey.FOODS}>
                    {PRODUCT_TYPES[EProductTypeKey.FOODS]}
                  </IonSelectOption>
                </Select>
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({
                field: { onChange, onBlur, ...field },
                fieldState: { error },
              }) => (
                <TextArea
                  placeholder="¿Cómo describes tu producto?"
                  onIonChange={onChange}
                  onIonBlur={onBlur}
                  disabled={isSubmitting}
                  helper={error?.message}
                  className={styles.productFormInputDescription}
                  maxlength={500}
                  helperIsError
                  {...field}
                />
              )}
            />
          </section>

          <section className={`${styles.productFormFileContainer}`}>
            {isCapacitor ? (
              <>
                <div
                  className={styles.productFormFileContainer}
                  onClick={handleOpenCamera}
                >
                  <div className={`${styles.productFormFile}`}>
                    {product?.fileUrl && !valueImage && (
                      <img
                        src={product?.fileUrl}
                        alt="Imagen Actual"
                        className={styles.productFormOldImg}
                      />
                    )}
                    <MdOutlineAddPhotoAlternate size={32} />
                    <div className={`${styles.productFormFileDescription}`}>
                      <p>
                        {valueImage
                          ? (valueImage as any).name
                          : "Elija una imagen de su Galería o use su Cámara"}
                      </p>
                    </div>
                  </div>
                </div>
                <IonNote className={styles.productFormFileError}>
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
                    <div className={`${styles.productFormFile}`}>
                      {product?.fileUrl && !valueImage && (
                        <img
                          src={product?.fileUrl}
                          alt="Flyer Actual"
                          className={styles.productFormOldImg}
                        />
                      )}
                      <MdOutlineAddPhotoAlternate size={32} />
                      <div className={`${styles.productFormFileDescription}`}>
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
                <IonNote className={styles.productFormFileError}>
                  {errorFile
                    ? errorFile
                    : errors.image?.message && errors.image?.message}
                </IonNote>
              </>
            )}

            {valueImage && (
              <div
                className={`animate__animated animate__fadeIn ${styles.productFormFileDeleteBtnContainer}`}
              >
                <Button
                  type="button"
                  fill="outline"
                  color="danger"
                  size="small"
                  className={styles.productFormFileDeleteBtn}
                  onClick={handleDeleteFile}
                >
                  <HiOutlineTrash size={18} />
                </Button>
              </div>
            )}
            {product?.fileUrl && (
              <IonNote className={styles.productFormFileInfo}>
                El nuevo flyer reemplazará el anterior
              </IonNote>
            )}
          </section>

          <Button
            expand="block"
            color="primary"
            type="submit"
            disabled={isLoading}
            isLoading={isSubmitting || isLoading}
            className={`${styles.productFormBtn}`}
          >
            Guardar
          </Button>
        </form>
      </IonContent>
    </IonModal>
  );
};
