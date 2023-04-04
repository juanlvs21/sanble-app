import {
  InputInputEventDetail,
  IonButtonCustomEvent,
  IonCheckboxCustomEvent,
  IonInputCustomEvent,
  IonTextareaCustomEvent,
} from "@ionic/core";
import {
  CheckboxChangeEventDetail,
  TextareaChangeEventDetail,
} from "@ionic/react";
import { IonicReactProps } from "@ionic/react/dist/types/components/IonicReactProps";
import { DOMAttributes } from "react";

export type TColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "danger"
  | "light"
  | "medium"
  | "dark";

export type TInputHelpers = {
  /**
   * Error content
   */
  helper?: string | React.ReactElement;
  /**
   * Show error
   */
  helperIsError?: boolean;
};

export type TCheckbox = {
  /**
   * If `true`, the checkbox is selected.
   */
  checked?: boolean;
  /**
   * The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`. For more information on colors, see [theming](/docs/theming/basics).
   */
  color?: TColor;
  /**
   * If `true`, the user cannot interact with the checkbox.
   */
  disabled?: boolean;
  /**
   * If `true`, the checkbox will visually appear as indeterminate.
   */
  indeterminate?: boolean;
  /**
   * The mode determines which platform styles to use.
   */
  mode?: "ios" | "md";
  /**
   * The name of the control, which is submitted with the form data.
   */
  name?: string;
  /**
   * Emitted when the checkbox loses focus.
   */
  onIonBlur?: (event: IonCheckboxCustomEvent<void>) => void;
  /**
   * Emitted when the checked property has changed.
   */
  onIonChange?: (
    event: IonCheckboxCustomEvent<CheckboxChangeEventDetail>
  ) => void;
  /**
   * Emitted when the checkbox has focus.
   */
  onIonFocus?: (event: IonCheckboxCustomEvent<void>) => void;
  /**
   * The value of the checkbox does not mean if it's checked or not, use the `checked` property for that.  The value of a checkbox is analogous to the value of an `<input type="checkbox">`, it's only used when the checkbox participates in a native `<form>`.
   */
  value?: any | null;
};

export type TButton<T = any> = IonicReactProps &
  DOMAttributes<T> & {
    /**
     * Router path to navigate
     */
    routerLink?: string | undefined;
    /**
     * The type of button.
     */
    buttonType?: string;
    /**
     * The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`. For more information on colors, see [theming](/docs/theming/basics).
     */
    color?: TColor;
    /**
     * If `true`, the user cannot interact with the button.
     */
    disabled?: boolean;
    /**
     * This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want).
     */
    download?: string | undefined;
    /**
     * Set to `"block"` for a full-width button or to `"full"` for a full-width button without left and right borders.
     */
    expand?: "full" | "block";
    /**
     * Set to `"clear"` for a transparent button, to `"outline"` for a transparent button with a border, or to `"solid"`. The default style is `"solid"` except inside of a toolbar, where the default is `"clear"`.
     */
    fill?: "clear" | "outline" | "solid" | "default";
    /**
     * Contains a URL or a URL fragment that the hyperlink points to. If this property is set, an anchor tag will be rendered.
     */
    href?: string | undefined;
    /**
     * The mode determines which platform styles to use.
     */
    mode?: "ios" | "md";
    /**
     * Emitted when the button loses focus.
     */
    onIonBlur?: (event: IonButtonCustomEvent<void>) => void;
    /**
     * Emitted when the button has focus.
     */
    onIonFocus?: (event: IonButtonCustomEvent<void>) => void;
    /**
     * Specifies the relationship of the target object to the link object. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
     */
    rel?: string | undefined;
    /**
     * When using a router, it specifies the transition animation when navigating to another page using `href`.
     */
    routerAnimation?: any | undefined;
    /**
     * When using a router, it specifies the transition direction when navigating to another page using `href`.
     */
    routerDirection?: "forward" | "back" | "root";
    /**
     * The button shape.
     */
    shape?: "round";
    /**
     * The button size.
     */
    size?: "small" | "default" | "large";
    /**
     * If `true`, activates a button with a heavier font weight.
     */
    strong?: boolean;
    /**
     * Specifies where to display the linked URL. Only applies when an `href` is provided. Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`.
     */
    target?: string | undefined;
    /**
     * The type of the button.
     */
    type?: "submit" | "reset" | "button";
  };
