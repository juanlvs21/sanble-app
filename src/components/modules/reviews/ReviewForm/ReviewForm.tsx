import { FormikHelpers, useFormik } from "formik";

import { Button } from "@/components/common/buttons/Button";
import { Input } from "@/components/common/forms/Input";
import { Stars } from "@/components/common/Stars";
import { getErrorMessage } from "@/helpers/getFormikErrorMsg";
import { reviewSchema } from "@/helpers/validator/schema";
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

export const ReviewForm: React.FC<ComponentProps> = ({
  review,
  isLoading,
  handleSave,
  className = "",
}) => {
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
        className={styles.stars}
      />
      <Input
        placeholder="Comentario"
        type="text"
        name="comment"
        onIonChange={handleChange}
        onIonBlur={handleBlur}
        disabled={isSubmitting || isLoading}
        value={values.comment}
        helper={getErrorMessage("comment", touched, errors)}
        className={styles.reviewFormInput}
        maxlength={500}
        max={5}
        helperIsError
        textarea
        multiple
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
