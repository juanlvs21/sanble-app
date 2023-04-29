import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { FormikHelpers, useFormik } from "formik";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { BiEnvelope, BiPhone } from "react-icons/bi";
import { MdOutlineDescription, MdTitle } from "react-icons/md";
import { TbMap2 } from "react-icons/tb";

import { Button } from "@/components/common/buttons/Button";
import { Input } from "@/components/common/forms/Input";
import { TextArea } from "@/components/common/forms/TextArea";
import { getErrorMessage } from "@/helpers/getFormikErrorMsg";
import { newStandSchema } from "@/helpers/validator/stand";
import { TStandForm } from "@/types/TStand";
import styles from "./StandForm.module.css";

export type ComponentProps = {
  /**
   * Default values
   */
  formValues: TStandForm;
  /**
   * Handle save photo
   */
  onSubmit: (
    values: TStandForm,
    formikHelpers: FormikHelpers<TStandForm>
  ) => void | Promise<void>;
  /**
   * Form Loading
   */
  isLoading?: boolean;
};

export const StandForm = ({ formValues, onSubmit }: ComponentProps) => {
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik<TStandForm>({
      enableReinitialize: true,
      initialValues: formValues,
      validationSchema: newStandSchema,
      onSubmit: onSubmit,
    });

  return (
    <form className={styles.formStandContainer} onSubmit={handleSubmit}>
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
          </IonCol>
          <IonCol size="12" size-sm="6">
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
          </IonCol>
          <IonCol size="12" size-sm="6">
            <TextArea
              placeholder="Descripción"
              name="description"
              Icon={<MdOutlineDescription />}
              onIonInput={handleChange}
              onIonBlur={handleBlur}
              value={values.description}
              helper={getErrorMessage("description", touched, errors)}
              className={styles.formStandTextArea}
              maxlength={500}
              helperIsError
            />
          </IonCol>
          <IonCol size="12" size-sm="6">
            <TextArea
              placeholder="Slogan"
              name="slogan"
              Icon={<TbMap2 />}
              onIonInput={handleChange}
              onIonBlur={handleBlur}
              value={values.slogan}
              helper={getErrorMessage("slogan", touched, errors)}
              maxlength={500}
              className={styles.formStandTextArea}
              helperIsError
            />
          </IonCol>
        </IonRow>
        <IonRow className={styles.formStandNextRow}>
          <IonCol size="12" size-sm="6">
            <Button expand="block" color="primary" type="submit">
              Guardar
            </Button>
          </IonCol>
        </IonRow>
      </IonGrid>
    </form>
  );
};
