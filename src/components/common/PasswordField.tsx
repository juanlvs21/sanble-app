import { useState } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  InputBaseProps,
} from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { VscKey } from "react-icons/vsc";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

export type ComponentProps = {
  /**
   * Input value
   */
  value?: any;
  /**
   * Callback function event on change
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Callback function event on blur
   */
  onBlur?: InputBaseProps["onBlur"];
  /**
   * Input name
   */
  name?: string;
  /**
   * Input placeholder
   */
  placeholder?: string;
  /**
   * Input disabled
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Input fullWidth
   *
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Input error
   *
   * @default false
   */
  error?: boolean;
  /**
   * Input helpertext
   */
  helperText?: string;
  /**
   * System props styles
   */
  sx?: SxProps<Theme>;
};

export const PasswordField: React.FC<ComponentProps> = ({
  disabled = false,
  fullWidth = false,
  error = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((state) => !state);

  return (
    <TextField
      {...props}
      type={showPassword ? "text" : "password"}
      error={error}
      fullWidth={fullWidth}
      disabled={disabled}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <VscKey size={20} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
