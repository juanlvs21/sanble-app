import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";

export type ComponentProps = {
  /**
   * Value selected
   */
  value: number;
  /**
   * Items for Segment Buttons
   */
  items: string[];
  /**
   * Click Segment Button item
   */
  onChange: (value: number) => void;
  /**
   * Custom className for content component
   */
  className?: string;
  /**
   * Custom className for content IonSegmentButton component
   */
  classNameButtons?: string;
};

export const SegmentDetails = ({
  value,
  items,
  onChange,
  className,
  classNameButtons,
}: ComponentProps) => {
  return (
    <IonSegment value={`${value}`} className={`${className}`}>
      {items.map((item, index) => (
        <IonSegmentButton
          key={`${index}`}
          value={`${index}`}
          onClick={() => onChange(index)}
          className={`${classNameButtons}`}
        >
          <IonLabel>{item}</IonLabel>
        </IonSegmentButton>
      ))}
    </IonSegment>
  );
};
