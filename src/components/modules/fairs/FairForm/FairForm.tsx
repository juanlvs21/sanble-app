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
import { BiEnvelope, BiPhone } from "react-icons/bi";
import { IoMdCalendar } from "react-icons/io";
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
import { EFairCelebrationType, TFairForm } from "@/types/TFair";
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
  const { control, handleSubmit, setValue, watch, formState } =
    useForm<TFairForm>({
      mode: "all",
      values: formValues,
      resolver: fairSchema,
    });

  const handleSetValueCelebrationType = (
    e: IonSelectCustomEvent<SelectChangeEventDetail<EFairCelebrationType>>
  ) => {
    setValue(
      "celebrationType",
      e.detail.value !== EFairCelebrationType.NOT_SPECIFIED
        ? e.detail.value
        : undefined
    );
    setValue("celebrationDate", "");
    setValue("celebrationMonthlyDay", 0);
    setValue("celebrationWeeklyDay", 0);
  };

  const handleSetValueDate = (
    e: IonDatetimeCustomEvent<DatetimeChangeEventDetail>
  ) => {
    setValue("celebrationDate", e.detail.value?.toString());
  };

  const handleSetValueCelebrationWeeklyDay = (
    e: IonSelectCustomEvent<SelectChangeEventDetail<string>>
  ) => {
    setValue("celebrationWeeklyDay", Number(e.detail.value));
  };

  const handleSetValueCelebrationMonthlyDay = (
    e: IonSelectCustomEvent<SelectChangeEventDetail<string>>
  ) => {
    setValue("celebrationMonthlyDay", Number(e.detail.value));
  };

  const valueGeoPoint = watch("geopoint");
  const valueName = watch("name");
  const valueCelebrationType = watch("celebrationType");

  const showCelebrationInput =
    valueCelebrationType !== undefined &&
    valueCelebrationType !== EFairCelebrationType.NOT_SPECIFIED;

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
          <IonCol size="12" size-sm="12" size-md="6">
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
          </IonCol>
          <IonCol size="12" size-sm="12" size-md="6">
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
                  prefix="+58"
                  value={value}
                  helper={error?.message}
                  helperIsError
                  {...field}
                />
              )}
            />
          </IonCol>
          <IonCol size="12" size-sm="12" size-md="6">
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

        <span className={`${styles.divider}`} />

        <IonRow>
          <IonCol
            size="12"
            size-sm="12"
            size-md={showCelebrationInput ? "6" : "12"}
          >
            <Controller
              control={control}
              name="celebrationType"
              render={({
                field: { onBlur, ...field },
                fieldState: { error },
              }) => (
                <Select
                  placeholder="Fecha de celebración"
                  Icon={<IoMdCalendar />}
                  interface="action-sheet"
                  onIonChange={handleSetValueCelebrationType}
                  onIonBlur={onBlur}
                  helper={error?.message}
                  cancelText="Cancelar"
                  helperIsError
                  {...field}
                >
                  <IonSelectOption value={EFairCelebrationType.NOT_SPECIFIED}>
                    Celebración no especificada
                  </IonSelectOption>
                  <IonSelectOption value={EFairCelebrationType.WEEKLY}>
                    Celebración semanal
                  </IonSelectOption>
                  <IonSelectOption value={EFairCelebrationType.MONTHLY}>
                    Celebración mensual
                  </IonSelectOption>
                  <IonSelectOption value={EFairCelebrationType.SPECIFIC_DATE}>
                    Celebración en fecha específica
                  </IonSelectOption>
                </Select>
              )}
            />
          </IonCol>
          {showCelebrationInput &&
            valueCelebrationType === EFairCelebrationType.WEEKLY && (
              <IonCol
                size="12"
                size-sm="12"
                size-md={showCelebrationInput ? "6" : "12"}
              >
                <Controller
                  control={control}
                  name="celebrationWeeklyDay"
                  render={({
                    field: { onBlur, ...field },
                    fieldState: { error },
                  }) => (
                    <Select
                      placeholder="Día de semana"
                      Icon={<IoMdCalendar />}
                      interface="action-sheet"
                      onIonChange={handleSetValueCelebrationWeeklyDay}
                      onIonBlur={onBlur}
                      helper={error?.message}
                      cancelText="Cancelar"
                      label="Día: "
                      helperIsError
                      {...field}
                    >
                      <IonSelectOption value={1}>Lunes</IonSelectOption>
                      <IonSelectOption value={2}>Martes</IonSelectOption>
                      <IonSelectOption value={3}>Miércoles</IonSelectOption>
                      <IonSelectOption value={4}>Jueves</IonSelectOption>
                      <IonSelectOption value={5}>Viernes</IonSelectOption>
                      <IonSelectOption value={6}>Sábado</IonSelectOption>
                      <IonSelectOption value={7}>Domingo</IonSelectOption>
                    </Select>
                  )}
                />
              </IonCol>
            )}
          {showCelebrationInput &&
            valueCelebrationType === EFairCelebrationType.MONTHLY && (
              <IonCol
                size="12"
                size-sm="12"
                size-md={showCelebrationInput ? "6" : "12"}
              >
                <Controller
                  control={control}
                  name="celebrationMonthlyDay"
                  render={({
                    field: { onBlur, ...field },
                    fieldState: { error },
                  }) => (
                    <Select
                      placeholder="Día del mes"
                      Icon={<IoMdCalendar />}
                      interface="action-sheet"
                      onIonChange={handleSetValueCelebrationMonthlyDay}
                      onIonBlur={onBlur}
                      helper={error?.message}
                      cancelText="Cancelar"
                      label="Día: "
                      helperIsError
                      {...field}
                    >
                      <IonSelectOption value={1}>1</IonSelectOption>
                      <IonSelectOption value={2}>2</IonSelectOption>
                      <IonSelectOption value={3}>3</IonSelectOption>
                      <IonSelectOption value={4}>4</IonSelectOption>
                      <IonSelectOption value={5}>5</IonSelectOption>
                      <IonSelectOption value={6}>6</IonSelectOption>
                      <IonSelectOption value={7}>7</IonSelectOption>
                      <IonSelectOption value={8}>8</IonSelectOption>
                      <IonSelectOption value={9}>9</IonSelectOption>
                      <IonSelectOption value={10}>10</IonSelectOption>
                      <IonSelectOption value={11}>11</IonSelectOption>
                      <IonSelectOption value={12}>12</IonSelectOption>
                      <IonSelectOption value={13}>13</IonSelectOption>
                      <IonSelectOption value={14}>14</IonSelectOption>
                      <IonSelectOption value={15}>15</IonSelectOption>
                      <IonSelectOption value={16}>16</IonSelectOption>
                      <IonSelectOption value={17}>17</IonSelectOption>
                      <IonSelectOption value={18}>18</IonSelectOption>
                      <IonSelectOption value={19}>19</IonSelectOption>
                      <IonSelectOption value={20}>20</IonSelectOption>
                      <IonSelectOption value={21}>21</IonSelectOption>
                      <IonSelectOption value={22}>22</IonSelectOption>
                      <IonSelectOption value={23}>23</IonSelectOption>
                      <IonSelectOption value={24}>24</IonSelectOption>
                      <IonSelectOption value={25}>25</IonSelectOption>
                      <IonSelectOption value={26}>26</IonSelectOption>
                      <IonSelectOption value={27}>27</IonSelectOption>
                      <IonSelectOption value={28}>28</IonSelectOption>
                      <IonSelectOption value={29}>29</IonSelectOption>
                      <IonSelectOption value={30}>30</IonSelectOption>
                      <IonSelectOption value={31}>31</IonSelectOption>
                    </Select>
                  )}
                />
              </IonCol>
            )}
          {showCelebrationInput &&
            valueCelebrationType === EFairCelebrationType.SPECIFIC_DATE && (
              <IonCol size="12" size-sm="12" size-md="6">
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
                      Icon={<IoMdCalendar />}
                      onIonBlur={onBlur}
                      value={
                        value ? dayjs(value).format("DD MMM - hh:mm a") : ""
                      }
                      helper={error?.message}
                      helperIsError
                      {...field}
                    />
                  )}
                />
              </IonCol>
            )}
        </IonRow>
        <IonRow className={styles.formFairNextRow}>
          <IonCol size="12" size-sm="12" size-md="6">
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
