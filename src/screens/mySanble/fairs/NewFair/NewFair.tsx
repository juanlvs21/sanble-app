import { DatetimeChangeEventDetail, IonDatetimeCustomEvent } from "@ionic/core";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonModal,
  IonRow,
  IonSelectOption,
} from "@ionic/react";
import { useFormik } from "formik";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useEffect } from "react";
import { BiDirections, BiEnvelope, BiPhone } from "react-icons/bi";
import { HiOutlineCalendar } from "react-icons/hi";
import { MdOutlineDescription, MdTitle } from "react-icons/md";
import { TbMap2 } from "react-icons/tb";

import { Button } from "@/components/common/buttons/Button";
import { Datetime } from "@/components/common/forms/Datetime";
import { Input } from "@/components/common/forms/Input";
import { Select } from "@/components/common/forms/Select";
import { TextArea } from "@/components/common/forms/TextArea";
import { getErrorMessage } from "@/helpers/getFormikErrorMsg";
import { dayjs } from "@/helpers/time";
import { newFairSchema } from "@/helpers/validator/fair";
import { EFairType, TFairForm } from "@/types/TFair";
import styles from "./NewFair.module.css";

export const NewFair = () => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    validateForm,
    values,
    touched,
    errors,
  } = useFormik<TFairForm>({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
      address: "",
      type: undefined,
      celebrationDate: "",
      contactEmail: "",
      contactPhone: "",
    },
    validationSchema: newFairSchema,
    // onSubmit: handleSave,
    onSubmit: (values) => console.log({ values }),
  });

  const handleSetValueDate = (
    e: IonDatetimeCustomEvent<DatetimeChangeEventDetail>
  ) => {
    setFieldValue(e.target.name, e.detail.value);
  };

  return (
    <form
      className={styles.newFairContainer}
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
              onInput={handleChange}
              onIonBlur={handleBlur}
              value={values.type}
              helper={getErrorMessage("type", touched, errors)}
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
              helperIsError
            />
          </IonCol>
        </IonRow>
        <IonRow className={styles.newFairNextRow}>
          <IonCol size="12" size-sm="6">
            <Button expand="block" color="primary" type="submit">
              Siguiente
            </Button>
          </IonCol>
        </IonRow>
      </IonGrid>

      <IonModal>
        <IonContent>
          <h1>Hola</h1>
        </IonContent>
      </IonModal>
    </form>
  );
};

// >name
// >description
// >type
// >contactEmail
// >contactPhone
// >celebrationDate
// >address
// geopoint?
// newFairSchema
// Colocar un boton de siguiente que abra con modal con el mapa, y
// que el modal sea el que haga el submit, redirigir a detalles de
// feria con un state goBack del listado de mis ferias
