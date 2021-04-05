import React from "react";
import {
  IonModal,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonToast,
  IonSpinner,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";

// Styles
import styles from "./MySanble.module.css";

// Components
import ErrorFormik from "../forms/ErrorFormik";

// Hooks
import useApp from "../../hooks/useApp";
import useDarkmode from "../../hooks/useDarkmode";
import useAuth from "../../hooks/useAuth";
import useStands from "../../hooks/useStands";

interface ContainerProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialValues = {
  name: "",
  slogan: "",
  description: "",
};

const MySanbleNewStandModal: React.FC<ContainerProps> = ({
  showModal,
  setShowModal,
}) => {
  const history = useHistory();

  const {
    session: { user },
  } = useAuth();
  const { isDesktop } = useApp();
  const { darkMode } = useDarkmode();
  const { errors, showErrors, setShowErrors, handleRegister } = useStands();

  const handleClose = () => setShowModal(false);

  const onSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    const payload = {
      ...values,
      uuid_user: user.uid,
    };

    handleRegister(payload)
      .then((res: any) => {
        resetForm(initialValues);
        handleClose();
        history.push(`/stand/${res.uuid}`);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      <IonModal
        isOpen={showModal}
        onDidDismiss={handleClose}
        cssClass={isDesktop() ? styles.modal : ""}
      >
        <div className={styles.btn_container}>
          <IonButton
            className={styles.btn_close}
            color="medium"
            size="small"
            fill="outline"
            onClick={handleClose}
          >
            x
          </IonButton>
        </div>

        <div className={`${styles.content} ${darkMode && styles.dark_mode}`}>
          <h3>Registrar Nuevo Stand</h3>

          <Formik
            initialValues={initialValues}
            validate={(values) => {
              const errors: any = {};

              if (!values.name) errors.name = "El Nombre requerida";

              if (!values.description)
                errors.description = "La Descripción requerida";

              return errors;
            }}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <IonItem>
                  <IonLabel position="floating">Nombre</IonLabel>
                  <IonInput
                    name="name"
                    disabled={isSubmitting}
                    onIonBlur={handleBlur}
                    onIonChange={handleChange}
                    value={values.name}
                  />
                </IonItem>
                <ErrorFormik error={errors.name} touched={touched.name} />

                <IonItem>
                  <IonLabel position="floating">Slogan</IonLabel>
                  <IonInput
                    name="slogan"
                    disabled={isSubmitting}
                    onIonBlur={handleBlur}
                    onIonChange={handleChange}
                    value={values.slogan}
                  />
                </IonItem>
                <ErrorFormik error={errors.slogan} touched={touched.slogan} />

                <IonItem>
                  <IonLabel position="floating">Descripción</IonLabel>
                  <IonTextarea
                    name="description"
                    disabled={isSubmitting}
                    onIonBlur={handleBlur}
                    onIonChange={handleChange}
                    value={values.description}
                  />
                </IonItem>
                <ErrorFormik
                  error={errors.description}
                  touched={touched.description}
                />

                <div className={styles.container_btns}>
                  {/* Trigger submit event when pressing enter on inputs */}
                  <input
                    type="submit"
                    style={{ display: "none" }}
                    disabled={isSubmitting}
                  />
                  <IonButton
                    expand="block"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <IonSpinner name="dots" /> : "Guardar"}
                  </IonButton>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </IonModal>

      <IonToast
        isOpen={showErrors}
        onDidDismiss={() => setShowErrors(false)}
        message={errors}
        duration={3000}
      />
    </>
  );
};

export default MySanbleNewStandModal;
