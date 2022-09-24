export interface InputChangeEventDetail {
  value: string | undefined | null;
}

export interface IonInputCustomEvent<T> extends CustomEvent<T> {
  detail: T;
  target: HTMLIonInputElement;
}

export interface IonButtonCustomEvent<T> extends CustomEvent<T> {
  detail: T;
  target: HTMLIonButtonElement;
}

export type TInput = {
  /**
   * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user. Available options: `"off"`, `"none"`, `"on"`, `"sentences"`, `"words"`, `"characters"`.
   */
  autocapitalize?: string;
  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  autocomplete?:
    | "on"
    | "off"
    | "name"
    | "honorific-prefix"
    | "given-name"
    | "additional-name"
    | "family-name"
    | "honorific-suffix"
    | "nickname"
    | "email"
    | "username"
    | "new-password"
    | "current-password"
    | "one-time-code"
    | "organization-title"
    | "organization"
    | "street-address"
    | "address-line1"
    | "address-line2"
    | "address-line3"
    | "address-level4"
    | "address-level3"
    | "address-level2"
    | "address-level1"
    | "country"
    | "country-name"
    | "postal-code"
    | "cc-name"
    | "cc-given-name"
    | "cc-additional-name"
    | "cc-family-name"
    | "cc-family-name"
    | "cc-number"
    | "cc-exp"
    | "cc-exp-month"
    | "cc-exp-year"
    | "cc-csc"
    | "cc-type"
    | "transaction-currency"
    | "transaction-amount"
    | "language"
    | "bday"
    | "bday-day"
    | "bday-month"
    | "bday-year"
    | "sex"
    | "tel"
    | "tel-country-code"
    | "tel-national"
    | "tel-area-code"
    | "tel-local"
    | "tel-extension"
    | "impp"
    | "url"
    | "photo";
  /**
   * Whether auto correction should be enabled when the user is entering/editing the text value.
   */
  autocorrect?: "on" | "off";
  /**
   * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
   */
  autofocus?: boolean;
  /**
   * If `true`, a clear icon will appear in the input when there is a value. Clicking it clears the input.
   */
  clearInput?: boolean;
  /**
   * If `true`, the value will be cleared after focus upon edit. Defaults to `true` when `type` is `"password"`, `false` for all other types.
   */
  clearOnEdit?: boolean;
  /**
   * The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`. For more information on colors, see [theming](/docs/theming/basics).
   */
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "warning"
    | "danger"
    | "light"
    | "medium"
    | "dark";
  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `ionChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  debounce?: number;
  /**
   * If `true`, the user cannot interact with the input.
   */
  disabled?: boolean;
  /**
   * A hint to the browser for which enter key to display. Possible values: `"enter"`, `"done"`, `"go"`, `"next"`, `"previous"`, `"search"`, and `"send"`.
   */
  enterkeyhint?:
    | "enter"
    | "done"
    | "go"
    | "next"
    | "previous"
    | "search"
    | "send";
  /**
   * A hint to the browser for which keyboard to display. Possible values: `"none"`, `"text"`, `"tel"`, `"url"`, `"email"`, `"numeric"`, `"decimal"`, and `"search"`.
   */
  inputmode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  /**
   * The maximum value, which must not be less than its minimum (min attribute) value.
   */
  max?: string | number;
  /**
   * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.
   */
  maxlength?: number;
  /**
   * The minimum value, which must not be greater than its maximum (max attribute) value.
   */
  min?: string | number;
  /**
   * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.
   */
  minlength?: number;
  /**
   * The mode determines which platform styles to use.
   */
  mode?: "ios" | "md";
  /**
   * If `true`, the user can enter more than one value. This attribute applies when the type attribute is set to `"email"`, otherwise it is ignored.
   */
  multiple?: boolean;
  /**
   * The name of the control, which is submitted with the form data.
   */
  name?: string;
  /**
   * Emitted when the input loses focus.
   */
  onIonBlur?: (event: IonInputCustomEvent<FocusEvent>) => void;
  /**
   * Emitted when the value has changed.
   */
  onIonChange?: (event: IonInputCustomEvent<InputChangeEventDetail>) => void;
  /**
   * Emitted when the input has focus.
   */
  onIonFocus?: (event: IonInputCustomEvent<FocusEvent>) => void;
  /**
   * Emitted when a keyboard input occurred.
   */
  onIonInput?: (event: IonInputCustomEvent<InputEvent>) => void;
  /**
   * A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value of the type attribute is `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, `"date"`, or `"password"`, otherwise it is ignored. When the type attribute is `"date"`, `pattern` will only be used in browsers that do not support the `"date"` input type natively. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date for more information.
   */
  pattern?: string;
  /**
   * Instructional text that shows before the input has a value. This property applies only when the `type` property is set to `"email"`, `"number"`, `"password"`, `"search"`, `"tel"`, `"text"`, or `"url"`, otherwise it is ignored.
   */
  placeholder?: string;
  /**
   * If `true`, the user cannot modify the value.
   */
  readonly?: boolean;
  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  required?: boolean;
  /**
   * The initial size of the control. This value is in pixels unless the value of the type attribute is `"text"` or `"password"`, in which case it is an integer number of characters. This attribute applies only when the `type` attribute is set to `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, or `"password"`, otherwise it is ignored.
   */
  size?: number;
  /**
   * If `true`, the element will have its spelling and grammar checked.
   */
  spellcheck?: boolean;
  /**
   * Works with the min and max attributes to limit the increments at which a value can be set. Possible values are: `"any"` or a positive floating point number.
   */
  step?: string;
  /**
   * The type of control to display. The default type is text.
   */
  type?:
    | "date"
    | "email"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "url"
    | "time"
    | "week"
    | "month"
    | "datetime-local";
  /**
   * The value of the input.
   */
  value?: string | number | null;
};

export type TButton = {
  /**
   * The type of button.
   */
  buttonType?: string;
  /**
   * The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`. For more information on colors, see [theming](/docs/theming/basics).
   */
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "warning"
    | "danger"
    | "light"
    | "medium"
    | "dark";
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
