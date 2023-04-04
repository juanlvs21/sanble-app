import { IonCol, IonGrid, IonRow, IonSelectOption } from "@ionic/react";
import { useFormik } from "formik";
import { BiEnvelope, BiPhone } from "react-icons/bi";
import { HiOutlineCalendar, HiSelector } from "react-icons/hi";
import { MdOutlineDescription, MdTitle } from "react-icons/md";
import { TbMap2 } from "react-icons/tb";

import { Input } from "@/components/common/forms/Input";
import { Select } from "@/components/common/forms/Select";
import { TextArea } from "@/components/common/forms/TextArea";
import { EFairType, TFairForm } from "@/types/TFair";
import styles from "./NewFair.module.css";
import { Datetime } from "@/components/common/forms/Datetime";

export const NewFair = () => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    touched,
    errors,
    isSubmitting,
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
    // validationSchema: photoSchema,
    // onSubmit: handleSave,
    onSubmit: (values) => console.log({ values }),
  });

  return (
    <form className={styles.newFairContainer}>
      <IonGrid>
        <IonRow>
          <IonCol>
            <Input
              placeholder="Nombre"
              name="name"
              Icon={<MdTitle />}
              // onIonInput={handleChange}
              // onIonBlur={handleBlur}
              // disabled={isSubmitting}
              // value={values.email}
              // helper={getErrorMessage("email", touched, errors)}
              helperIsError
            />
            <Select
              placeholder="Tipo de Feria"
              Icon={<HiSelector />}
              interface="action-sheet"
            >
              <IonSelectOption value={EFairType.ENTREPRENEURSHIP}>
                Feria de Emprendimiento
              </IonSelectOption>
              <IonSelectOption value={EFairType.GASTRONOMIC}>
                Feria Gastronómica
              </IonSelectOption>
            </Select>
            <TextArea
              placeholder="Descripción"
              name="description"
              Icon={<MdOutlineDescription />}
              // onIonInput={handleChange}
              // onIonBlur={handleBlur}
              // disabled={isSubmitting || isLoading}
              // value={values.comment}
              // helper={getErrorMessage("comment", touched, errors)}
              value=""
              className={styles.reviewFormInput}
              maxlength={500}
              helperIsError
            />
            <Input
              placeholder="Direccion"
              name="address"
              Icon={<TbMap2 />}
              // onIonInput={handleChange}
              // onIonBlur={handleBlur}
              // disabled={isSubmitting}
              // value={values.email}
              // helper={getErrorMessage("email", touched, errors)}
              helperIsError
            />
            <Datetime
              placeholder="Fecha de celebración"
              onSetValue={(e) => console.log(e.target.value)}
              // name="celebrationDate"
              Icon={<HiOutlineCalendar />}
              // onIonInput={handleChange}
              // onIonBlur={handleBlur}
              // disabled={isSubmitting}
              // value={values.email}
              // helper={getErrorMessage("email", touched, errors)}
              helperIsError
            />
            <Input
              placeholder="Correo electrónico de contacto"
              name="contactEmail"
              Icon={<BiEnvelope />}
              // onIonInput={handleChange}
              // onIonBlur={handleBlur}
              // disabled={isSubmitting}
              // value={values.email}
              // helper={getErrorMessage("email", touched, errors)}
              helperIsError
            />
            <Input
              placeholder="Teléfono de contacto"
              name="contactPhone"
              Icon={<BiPhone />}
              // onIonInput={handleChange}
              // onIonBlur={handleBlur}
              // disabled={isSubmitting}
              // value={values.email}
              // helper={getErrorMessage("email", touched, errors)}
              helperIsError
            />
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
      </IonGrid>
    </form>
  );
};

// >name
// >description
// >type
// >contactEmail
// >contactPhone
// >celebrationDate
// address
// geopoint?
