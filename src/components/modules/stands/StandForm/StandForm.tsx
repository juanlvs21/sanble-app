import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiEnvelope, BiPhone } from "react-icons/bi";
import { MdOutlineDescription, MdTitle } from "react-icons/md";
import { TbMap2 } from "react-icons/tb";

import { Button } from "@/components/common/buttons/Button";
import { Input } from "@/components/common/forms/Input";
import { TextArea } from "@/components/common/forms/TextArea";
import { standSchema } from "@/helpers/validator/stand";
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
  handleSave: (values: TStandForm) => void | Promise<void>;
  /**
   * Form Loading
   */
  isLoading?: boolean;
};

export const StandForm = ({ formValues, handleSave }: ComponentProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TStandForm>({
    mode: "all",
    values: formValues,
    resolver: standSchema,
  });

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(handleSave)}
      onKeyUp={(e) => e.key === "Enter" && formRef.current?.requestSubmit()}
      className={styles.formStandContainer}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  className={styles.formStandTextArea}
                  maxlength={500}
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
              name="slogan"
              render={({
                field: { onChange, onBlur, ...field },
                fieldState: { error },
              }) => (
                <TextArea
                  placeholder="Slogan"
                  Icon={<TbMap2 />}
                  onIonInput={onChange}
                  onIonBlur={onBlur}
                  disabled={isSubmitting}
                  className={styles.formStandTextArea}
                  maxlength={500}
                  helper={error?.message}
                  helperIsError
                  {...field}
                />
              )}
            />
          </IonCol>
        </IonRow>
        <IonRow className={styles.formStandNextRow}>
          <IonCol size="12" size-sm="6">
            <Button
              expand="block"
              color="primary"
              type="submit"
              isLoading={isSubmitting}
            >
              Guardar
            </Button>
          </IonCol>
        </IonRow>
      </IonGrid>
    </form>
  );
};
