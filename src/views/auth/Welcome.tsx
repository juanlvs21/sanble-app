import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { styled, Box } from "@mui/system";
import { Button } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

import { WelcomeSlide } from "@/components/welcome/Slide";
import { useApp } from "@/hooks/useApp";

const BtnBackContainer = styled("div")`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;

  @media (min-width: 768px) {
    width: 600px;
    border-radius: 20px;
  }
`;
const ProgressContainer = styled("div")`
  width: 100%;
  height: 40px;
  display: block;
  position: fixed;
  bottom: 0;

  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;
const Progress = styled("div")`
  display: flex;
  height: 7px;
  margin: 15px 30px 0;
  border-radius: 20px;
  background-color: #ff86343d;
  position: relative;

  @media (min-width: 768px) {
    width: 600px;
    border-radius: 20px;
  }
`;
const ProgressActive = styled(Box)(
  ({ theme }) => `
    height: 7px;
    border-radius: 20px;
    background-color: ${theme.palette.primary.main};
    transition: all 300ms ease-in-out;
    `
);

export const WelcomeView: React.FC = () => {
  const navigate = useNavigate();
  const { handleSetShowWelcome } = useApp();

  const [active, setActive] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [show, setShow] = useState(true);

  const handleNext = () => setActive((state) => state + 1);
  const handleBack = () => active !== 0 && setActive((state) => state - 1);
  const handleGoAuth = async () => {
    await handleSetShowWelcome(false);
    navigate("/auth/signup");
  };
  const handleGoSkip = async () => {
    await handleSetShowWelcome(false);
    navigate("/in");
  };
  const slides = [
    {
      bgImage: "/img/welcome/welcome-wave1.svg",
      image: "/img/welcome/welcome-illustration1.svg",
      title: "Bienvenido",
      subTitle:
        "¿Estás listo para vivir tus ferias favoritas de una manera más cercana a ti?",
      handleBtnPrimary: handleNext,
      textBtnPrimary: "Vamos",
      darkBtnPrimary: false,
    },
    {
      bgImage: "/img/welcome/welcome-wave2.svg",
      image: "/img/welcome/welcome-illustration2.svg",
      imageWidth: 240,
      title: "Disfruta lo mejor",
      subTitle:
        "Las Ferias y Stands más populares, y además, ¡tú mismo puedes dar tu opinión sobre ellos!",
      handleBtnPrimary: handleNext,
      textBtnPrimary: "Ver más",
      darkBtnPrimary: true,
    },
    {
      bgImage: "/img/welcome/welcome-wave3.svg",
      image: "/img/welcome/welcome-illustration3.svg",
      title: "Encuéntralas",
      subTitle:
        "Encuentra las Ferias que más te gusten y los Stands más llamativos en cualquier lugar",
      handleBtnPrimary: handleNext,
      textBtnPrimary: "Ya casi",
      darkBtnPrimary: false,
    },
    {
      bgImage: "/img/welcome/welcome-wave4.svg",
      image: "/img/welcome/welcome-illustration4.svg",
      imageWidth: 230,
      title: "¡Emprende!",
      subTitle:
        "Crea tu propio Stand o incluso ¡Tu Feria! Y luego mira lo que la gente piensa de ellos",
      handleBtnPrimary: handleNext,
      textBtnPrimary: "Y ahora...",
      darkBtnPrimary: true,
    },
    {
      bgImage: "/img/welcome/welcome-wave5.svg",
      image: "/img/welcome/welcome-illustration5.svg",
      title: "¿Bueno, qué estás esperando?",
      handleBtnPrimary: handleGoAuth,
      textBtnPrimary: "Registrarse",
      darkBtnPrimary: false,
      handleBtnSecondary: handleGoSkip,
      textBtnSecondary: "Quizás mas tarde",
    },
  ];

  useEffect(() => {
    setProgress((100 / slides.length) * (active + 1));

    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 10);
  }, [active]);

  return (
    <>
      <BtnBackContainer>
        {active > 0 && (
          <Button
            aria-label="Atrás"
            color="primary"
            variant="contained"
            onClick={handleBack}
            sx={{
              width: 41,
              minWidth: 41,
              height: 41,
              borderRadius: 41,
            }}
          >
            <ChevronLeft />
          </Button>
        )}
      </BtnBackContainer>

      {show && <WelcomeSlide {...slides[active]} />}

      <ProgressContainer>
        <Progress>
          <ProgressActive sx={{ width: `${progress}%` }} />
        </Progress>
      </ProgressContainer>
    </>
  );
};
