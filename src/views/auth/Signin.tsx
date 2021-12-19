import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useFormik } from "formik";
import { IoMailOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

import { PasswordField } from "@/components/common/PasswordField";
import { LoadingFullScreen } from "@/components/common/LoadingFullScreen";
import { SigninSchema } from "@/helpers/validations/authSchema";
import { formikError } from "@/helpers/formikError";
import { useAuth } from "@/hooks/useAuth";

const Container = styled("div")`
  background-image: url("/img/wave3.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top right;
  padding: 20px 30px;
  height: calc(100vh - 182px);
  overflow-x: hidden;
  overflow-y: auto;

  @media (min-width: 425) {
    padding: 40px 50px 20px;
  }
  @media (min-width: 360px) {
    height: calc(100vh - 242px);
  }
  @media (min-width: 768px) {
    height: auto;
    overflow-y: hidden;
  }
`;

const Title = styled(Typography)`
  font-size: 24px;
  font-weight: 600;
  margin: 10px 0;
  display: flex;
  position: relative;

  & span {
    z-index: 5;
  }
`;
const TitleLine = styled("div")(
  ({ theme }) => `
  width: 100px;
  height: 7px;
  border-radius: 20px;
  background-color: ${theme.palette.primary.main};
  position: absolute;
  bottom: 10px;
  left: 7px;
  z-index: 0;
`
);
const Subtitle = styled(Typography)`
  font-size: 14px;
  margin-top: 0;
`;
const Form = styled("form")`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

export const SigninView: React.FC = () => {
  const { handleSignin } = useAuth();
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => handleSignin(values),
      validationSchema: SigninSchema,
    });

  return (
    <Container>
      <Title variant="h1">
        <span>Ingresar</span>
        <TitleLine />
      </Title>
      <Subtitle variant="h3">Ingresa en la Plataforma de Sanble</Subtitle>
      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="Correo electrónico"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IoMailOutline size={20} />
              </InputAdornment>
            ),
          }}
          error={formikError(errors.email, touched.email).show}
          helperText={formikError(errors.email, touched.email).msg}
          sx={{ marginTop: 3 }}
          fullWidth
        />
        <PasswordField
          placeholder="Contraseña"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          error={formikError(errors.password, touched.password).show}
          helperText={formikError(errors.password, touched.password).msg}
          sx={{ marginTop: 3 }}
          fullWidth
        />

        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{ marginTop: 5 }}
          fullWidth
        >
          Ingresar
        </Button>
      </form>
      <Button color="primary" variant="text" sx={{ marginTop: 1 }} fullWidth>
        Recuperar Contraseña
      </Button>
      <Button color="primary" variant="text" fullWidth>
        <FcGoogle size={20} /> Ingresa con Google
      </Button>
    </Container>
  );
};
