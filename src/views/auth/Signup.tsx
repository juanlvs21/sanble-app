import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useFormik } from "formik";
import { IoMailOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

import { PasswordField } from "@/components/common/PasswordField";
import { LoadingFullScreen } from "@/components/common/LoadingFullScreen";
import { SignupSchema } from "@/helpers/validations/authSchema";
import { useAuth } from "@/hooks/useAuth";

const Container = styled("div")`
  background-image: url("/img/wave4.svg");
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
  width: 87px;
  height: 7px;
  border-radius: 20px;
  background-color: ${theme.palette.primary.main};
  position: absolute;
  bottom: 10px;
  left: 104px;
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

export const SignupView: React.FC = () => {
  const { handleSignup, loading } = useAuth();
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => handleSignup(values),
    validationSchema: SignupSchema,
  });

  return (
    <Container>
      <Title variant="h1">
        <span>Crea tu Cuenta</span>
        <TitleLine />
      </Title>
      <Subtitle variant="h3">Unete a la Plataforma de Sanble</Subtitle>
      <Form onSubmit={handleSubmit}>
        <TextField
          placeholder="Nombre"
          name="name"
          onChange={handleChange}
          value={values.name}
          disabled={loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BsPerson size={20} />
              </InputAdornment>
            ),
          }}
          error={!!errors.name}
          helperText={errors.name}
          sx={{ marginTop: 3 }}
          fullWidth
        />
        <TextField
          placeholder="Correo electrónico"
          name="email"
          onChange={handleChange}
          value={values.email}
          disabled={loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IoMailOutline size={20} />
              </InputAdornment>
            ),
          }}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ marginTop: 3 }}
          fullWidth
        />
        <PasswordField
          placeholder="Contraseña"
          name="password"
          onChange={handleChange}
          value={values.password}
          disabled={loading}
          error={!!errors.password}
          helperText={errors.password}
          sx={{ marginTop: 3 }}
          fullWidth
        />

        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={loading}
          sx={{ marginTop: 5 }}
          fullWidth
        >
          Unirse
        </Button>
      </Form>
      <Button
        color="primary"
        variant="text"
        disabled={loading}
        sx={{ marginTop: 1 }}
        fullWidth
      >
        Recuperar Contraseña
      </Button>
      <Button color="primary" variant="text" disabled={loading} fullWidth>
        <FcGoogle size={20} /> Unirse con Google
      </Button>

      <LoadingFullScreen loading={loading} />
    </Container>
  );
};
