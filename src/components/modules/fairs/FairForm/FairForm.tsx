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
import { FormikHelpers, useFormik } from "formik";
import { LatLngTuple } from "leaflet";
import { parsePhoneNumberFromString } from "libphonenumber-js";
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
import { getErrorMessage } from "@/helpers/getFormikErrorMsg";
import { dayjs } from "@/helpers/time";
import { newFairSchema } from "@/helpers/validator/fair";
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
  handleFormNext: (
    values: TFairForm,
    formikHelpers: FormikHelpers<TFairForm>
  ) => void | Promise<void>;
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
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    touched,
    errors,
  } = useFormik<TFairForm>({
    enableReinitialize: true,
    initialValues: formValues,
    validationSchema: newFairSchema,
    onSubmit: handleFormNext,
  });

  const handleSetValueDate = (
    e: IonDatetimeCustomEvent<DatetimeChangeEventDetail>
  ) => {
    setFieldValue(e.target.name, e.detail.value);
  };

  const handleSetValueType = (
    e: IonSelectCustomEvent<SelectChangeEventDetail<EFairType>>
  ) => {
    setFieldValue(e.target.name, e.detail.value);
  };

  return (
    <form
      className={styles.formFairContainer}
      onSubmit={handleSubmit}
      onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
    >
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <Input
              placeholder="Nombre"
              name="name"
              Icon={<MdTitle />}
              onIonInput={handleChange}
              onIonBlur={handleBlur}
              value={values.name}
              helper={getErrorMessage("name", touched, errors)}
              helperIsError
            />
          </IonCol>
          <IonCol size="12" size-sm="6">
            <Select
              placeholder="Tipo de Feria"
              Icon={<BiDirections />}
              interface="action-sheet"
              name="type"
              onIonChange={handleSetValueType}
              onIonBlur={handleBlur}
              helper={getErrorMessage("type", touched, errors)}
              value={values.type}
              cancelText="Cancelar"
              helperIsError
            >
              <IonSelectOption value={EFairType.ENTREPRENEURSHIP}>
                Feria de Emprendimiento
              </IonSelectOption>
              <IonSelectOption value={EFairType.GASTRONOMIC}>
                Feria Gastronómica
              </IonSelectOption>
            </Select>
            <Datetime
              placeholder="Fecha de celebración"
              onSetValue={handleSetValueDate}
              name="celebrationDate"
              Icon={<HiOutlineCalendar />}
              onIonBlur={handleBlur}
              value={
                values.celebrationDate
                  ? dayjs(values.celebrationDate).format("DD MMM - hh:mm a")
                  : ""
              }
              helper={getErrorMessage("celebrationDate", touched, errors)}
              helperIsError
            />
            <TextArea
              placeholder="Descripción"
              name="description"
              Icon={<MdOutlineDescription />}
              onIonInput={handleChange}
              onIonBlur={handleBlur}
              value={values.description}
              helper={getErrorMessage("description", touched, errors)}
              className={styles.formFairTextArea}
              maxlength={500}
              helperIsError
            />
          </IonCol>
          <IonCol>
            <Input
              placeholder="Correo electrónico de contacto"
              name="contactEmail"
              type="email"
              inputmode="email"
              Icon={<BiEnvelope />}
              onIonInput={handleChange}
              onIonBlur={handleBlur}
              value={values.contactEmail}
              helper={getErrorMessage("contactEmail", touched, errors)}
              helperIsError
            />
            <Input
              placeholder="Teléfono de contacto"
              name="contactPhone"
              type="tel"
              inputmode="tel"
              Icon={<BiPhone />}
              onIonInput={handleChange}
              onIonBlur={handleBlur}
              label="+58"
              value={(
                parsePhoneNumberFromString(values.contactPhone, "VE")
                  ?.nationalNumber || values.contactPhone
              ).slice(0, 10)}
              helper={getErrorMessage("contactPhone", touched, errors)}
              helperIsError
            />
            <TextArea
              placeholder="Direccion"
              name="address"
              Icon={<TbMap2 />}
              onIonInput={handleChange}
              onIonBlur={handleBlur}
              value={values.address}
              helper={getErrorMessage("address", touched, errors)}
              maxlength={500}
              className={styles.formFairTextArea}
              helperIsError
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
            center={values.geopoint}
            DraggableMarkerTooltip={
              <Tooltip direction="bottom" offset={[0, 30]} permanent>
                <b>{values.name}</b>
              </Tooltip>
            }
          />
        </IonContent>
      </IonModal>
    </form>
  );
};
