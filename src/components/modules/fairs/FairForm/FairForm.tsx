import {
  DatetimeChangeEventDetail,
  IonDatetimeCustomEvent,
  IonSelectCustomEvent,
  SelectChangeEventDetail,
} from "@ionic/core";
import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonModal,
  IonRow,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { LatLngTuple } from "leaflet";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiDirections, BiEnvelope, BiPhone } from "react-icons/bi";
import { HiOutlineCalendar } from "react-icons/hi";
import { MdOutlineDescription, MdTitle } from "react-icons/md";
import { TbMap2 } from "react-icons/tb";

import { HeaderModal } from "@/components/common/HeaderModal";
import { Button } from "@/components/common/buttons/Button";
import { Datetime } from "@/components/common/forms/Datetime";
import { Input } from "@/components/common/forms/Input";
import { Select } from "@/components/common/forms/Select";
import { TextArea } from "@/components/common/forms/TextArea";
import { Map } from "@/components/modules/geolocation/Map";
import { dayjs } from "@/helpers/time";
import { fairSchema } from "@/helpers/validator/fair";
import { EFairType, TFairForm } from "@/types/TFair";
import { Tooltip } from "react-leaflet";
import styles from "./FairForm.module.css";

export type ComponentProps = {
  /**
   * Default values
   */
  formValues: TFairForm;
  /**
   * Handle save photo
   */
  handleFormNext: (values: TFairForm) => void | Promise<void>;
  /**
   * Open next step (Set location in the map)
   */
  openMapModal: boolean;
  /**
   * Function open on close map modal
   */
  onOpenMapModal: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * Set lat and lng in the values form
   */
  handleSetLocation: (latlng: LatLngTuple) => void;
  /**
   * Save new Fair
   */
  handleSave: () => Promise<void>;
  /**
   * Form Loading
   */
  isLoading?: boolean;
};

export const FairForm = ({
  formValues,
  openMapModal,
  handleFormNext,
  handleSetLocation,
  handleSave,
  onOpenMapModal,
}: ComponentProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { control, handleSubmit, setValue, watch } = useForm<TFairForm>({
    mode: "all",
    values: formValues,
    resolver: fairSchema,
  });

  const handleSetValueDate = (
    e: IonDatetimeCustomEvent<DatetimeChangeEventDetail>
  ) => {
    setValue("celebrationDate", e.detail.value?.toString());
  };

  const handleSetValueType = (
    e: IonSelectCustomEvent<SelectChangeEventDetail<EFairType>>
  ) => {
    setValue("type", e.detail.value);
  };

  const valueGeoPoint = watch("geopoint");
  const valueName = watch("name");

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(handleFormNext)}
      onKeyUp={(e) => e.key === "Enter" && formRef.current?.requestSubmit()}
      className={styles.formFairContainer}
    >
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <Controller
              control={control}
              name="name"
              render={({
                field: { onChange, onBlur, ...field },
                fieldState: { error },
              }) => (
                <Input
                  placeholder="Nombre"
                  Icon={<MdTitle />}
                  onIonInput={onChange}
                  onIonBlur={onBlur}
                  helper={error?.message}
                  helperIsError
                  {...field}
                />
              )}
            />
          </IonCol>
          <IonCol size="12" size-sm="6">
            <Controller
              control={control}
              name="type"
              render={({
                field: { onBlur, ...field },
                fieldState: { error },
              }) => (
                <Select
                  placeholder="Tipo de Feria"
                  Icon={<BiDirections />}
                  interface="action-sheet"
                  onIonChange={handleSetValueType}
                  onIonBlur={onBlur}
                  helper={error?.message}
                  cancelText="Cancelar"
                  helperIsError
                  {...field}
                >
                  <IonSelectOption value={EFairType.ENTREPRENEURSHIP}>
                    Feria de Emprendimiento
                  </IonSelectOption>
                  <IonSelectOption value={EFairType.GASTRONOMIC}>
                    Feria Gastronómica
                  </IonSelectOption>
                </Select>
              )}
            />
            <Controller
              control={control}
              name="celebrationDate"
              render={({
                field: { onBlur, value, ...field },
                fieldState: { error },
              }) => (
                <Datetime
                  placeholder="Fecha de celebración"
                  onSetValue={handleSetValueDate}
                  Icon={<HiOutlineCalendar />}
                  onIonBlur={onBlur}
                  value={value ? dayjs(value).format("DD MMM - hh:mm a") : ""}
                  helper={error?.message}
                  helperIsError
                  {...field}
                />
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
                  placeholder="Descripción"
                  Icon={<MdOutlineDescription />}
                  onIonInput={onChange}
                  onIonBlur={onBlur}
                  helper={error?.message}
                  className={styles.formFairTextArea}
                  maxlength={500}
                  helperIsError
                  {...field}
                />
              )}
            />
          </IonCol>
          <IonCol>
            <Controller
              control={control}
              name="contactEmail"
              render={({
                field: { onChange, onBlur, ...field },
                fieldState: { error },
              }) => (
                <Input
                  placeholder="Correo electrónico de contacto"
                  type="email"
                  inputmode="email"
                  Icon={<BiEnvelope />}
                  onIonInput={onChange}
                  onIonBlur={onBlur}
                  helper={error?.message}
                  helperIsError
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="contactPhone"
              render={({
                field: { onChange, onBlur, value, ...field },
                fieldState: { error },
              }) => (
                <Input
                  placeholder="Teléfono de contacto"
                  type="tel"
                  inputmode="tel"
                  Icon={<BiPhone />}
                  onIonInput={onChange}
                  onIonBlur={onBlur}
                  label="+58"
                  value={value}
                  helper={error?.message}
                  helperIsError
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="address"
              render={({
                field: { onChange, onBlur, ...field },
                fieldState: { error },
              }) => (
                <TextArea
                  placeholder="Dirección"
                  Icon={<TbMap2 />}
                  onIonInput={onChange}
                  onIonBlur={onBlur}
                  helper={error?.message}
                  maxlength={500}
                  className={styles.formFairTextArea}
                  helperIsError
                  {...field}
                />
              )}
            />
          </IonCol>
        </IonRow>
        <IonRow className={styles.formFairNextRow}>
          <IonCol size="12" size-sm="6">
            <Button expand="block" color="primary" type="submit">
              Siguiente
            </Button>
          </IonCol>
        </IonRow>
      </IonGrid>

      <IonModal isOpen={openMapModal} className={styles.formFairMapModal}>
        <HeaderModal>
          <IonToolbar>
            <IonButtons slot="start">
              <Button onClick={() => onOpenMapModal(false)}>Atrás</Button>
            </IonButtons>
            <IonTitle>Ubicación</IonTitle>
            <IonButtons slot="end">
              <Button strong={true} onClick={handleSave}>
                Guardar
              </Button>
            </IonButtons>
          </IonToolbar>
        </HeaderModal>
        <IonContent>
          <Map
            draggableMarkerEvent={handleSetLocation}
            center={valueGeoPoint}
            DraggableMarkerTooltip={
              <Tooltip direction="bottom" offset={[0, 30]} permanent>
                <b>{valueName}</b>
              </Tooltip>
            }
          />
        </IonContent>
      </IonModal>
    </form>
  );
};
