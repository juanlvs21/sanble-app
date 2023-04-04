import { FormikHelpers, useFormik } from "formik";

import { Button } from "@/components/common/buttons/Button";
import { TextArea } from "@/components/common/forms/TextArea";
import { Stars } from "@/components/common/Stars";
import { getErrorMessage } from "@/helpers/getFormikErrorMsg";
import { reviewSchema } from "@/helpers/validator/review";
import { TReview, TReviewForm } from "@/types/TReview";
import styles from "./ReviewForm.module.css";

export type ComponentProps = {
  /**
   * User review with the session logged
   */
  review?: TReview;
  /**
   * Handle save review
   */
  handleSave: (
    values: TReviewForm,
    formikHelpers: FormikHelpers<TReviewForm>
  ) => void | Promise<any>;
  /**
   * Review is loading
   */
  isLoading?: boolean;
  /**
   * Custom className component
   */
  className?: string;
};

export const ReviewForm = ({
  review,
  isLoading,
  handleSave,
  className = "",
}: ComponentProps) => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    touched,
    errors,
    isSubmitting,
  } = useFormik<TReviewForm>({
    enableReinitialize: true,
    initialValues: {
      comment: review?.comment || "",
      stars: review?.stars || 0,
    },
    validationSchema: reviewSchema,
    onSubmit: handleSave,
  });

  const handleChangeStars = (value: number) => setFieldValue("stars", value);

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.reviewForm} ${className}`}
    >
      <Stars
        value={values.stars}
        onChange={handleChangeStars}
        size={40}
        disable={isLoading || isSubmitting}
        className={styles.stars}
      />
      <TextArea
        placeholder="Comentario"
        name="comment"
        onIonInput={handleChange}
        onIonBlur={handleBlur}
        disabled={isSubmitting || isLoading}
        value={values.comment}
        helper={getErrorMessage("comment", touched, errors)}
        className={styles.reviewFormInput}
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
        {review ? "Editar" : "Guardar"}
      </Button>
    </form>
  );
};
