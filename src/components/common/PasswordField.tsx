import { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff, Key } from "@mui/icons-material";
import { SxProps, Theme } from "@mui/system";

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
   * System props styles
   */
  sx?: SxProps<Theme>;
};

export const PasswordField: React.FC<ComponentProps> = ({
  value,
  onChange,
  name,
  placeholder,
  sx,
  disabled = false,
  fullWidth = false,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((state) => !state);

  return (
    <TextField
      placeholder={placeholder}
      name={name}
      disabled={disabled}
      type={showPassword ? "text" : "password"}
      value={value}
      fullWidth={fullWidth}
      onChange={onChange}
      sx={sx}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Key color="primary" />
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
                <Visibility color="disabled" />
              ) : (
                <VisibilityOff color="disabled" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
