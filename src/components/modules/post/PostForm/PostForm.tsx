import { FormikHelpers, useFormik } from "formik";

import { Button } from "@/components/common/buttons/Button";
import { TextArea } from "@/components/common/forms/TextArea";
import { getErrorMessage } from "@/helpers/getFormikErrorMsg";
import { postSchema } from "@/helpers/validator/posts";
import { TPostForm } from "@/types/TPost";
import styles from "./PostForm.module.css";

export type ComponentProps = {
  /**
   * Handle save post
   */
  handleSave: (
    values: TPostForm,
    formikHelpers: FormikHelpers<TPostForm>
  ) => void | Promise<any>;
  /**
   * Post is loading
   */
  isLoading?: boolean;
  /**
   * Custom className component
   */
  className?: string;
};

export const PostForm = ({
  isLoading,
  handleSave,
  className = "",
}: ComponentProps) => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isSubmitting,
  } = useFormik<TPostForm>({
    enableReinitialize: true,
    initialValues: {
      text: "",
      image: undefined,
    },
    validationSchema: postSchema,
    onSubmit: handleSave,
  });

  return (
    <form onSubmit={handleSubmit} className={`${styles.postForm} ${className}`}>
      <TextArea
        placeholder="¿Que quieres compartir?"
        name="text"
        onIonInput={handleChange}
        onIonBlur={handleBlur}
        disabled={isSubmitting || isLoading}
        value={values.text}
        helper={getErrorMessage("text", touched, errors)}
        className={styles.postFormInput}
        maxlength={500}
        helperIsError
      />
      <Button
        expand="block"
        color="primary"
        type="submit"
        disabled={isLoading}
        isLoading={isSubmitting || isLoading}
      >
        Guardar
      </Button>
    </form>
  );
};
