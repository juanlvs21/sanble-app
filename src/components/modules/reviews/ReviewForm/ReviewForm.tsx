import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/common/buttons/Button";
import { TextArea } from "@/components/common/forms/TextArea";
import { Stars } from "@/components/common/Stars";
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
  handleSave: (values: TReviewForm) => void | Promise<any>;
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
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<TReviewForm>({
    values: {
      comment: review?.comment || "",
      stars: review?.stars || 0,
    },
    resolver: reviewSchema,
  });

  const handleChangeStars = (value: number) => setValue("stars", value);

  const valuesStars = watch("stars");

  return (
    <form
      onSubmit={handleSubmit(handleSave)}
      className={`${styles.reviewForm} ${className}`}
    >
      <Stars
        onChange={handleChangeStars}
        value={valuesStars}
        size={40}
        disable={isLoading || isSubmitting}
        className={styles.stars}
      />
      <Controller
        control={control}
        name="comment"
        render={({
          field: { onChange, onBlur, ...field },
          fieldState: { error },
        }) => (
          <TextArea
            placeholder="Comentario"
            onIonInput={onChange}
            onIonBlur={onBlur}
            disabled={isSubmitting || isLoading}
            maxlength={500}
            className={styles.reviewFormInput}
            helper={error?.message}
            helperIsError
            {...field}
          />
        )}
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
