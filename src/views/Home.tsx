import { useEffect } from "react";
import { styled } from "@mui/system";
import { useMediaQuery } from "react-responsive";

import { SearchInput } from "@/components/common/SearchInput";
import { SectionCarousel } from "@/components/common/SectionCarousel";
import { FairCard } from "@/components/fairs/Card";
import { useFairs } from "@/hooks/useFairs";
import { TFair } from "@/types/Fairs";

const Container = styled("div")({
  marginTop: 20,
});

const renderFairs = (fairs: TFair[]) => {
  return fairs.map((fair) => <FairCard fair={fair} />);
};

export const Home: React.FC = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const { getRecentFairs, fairs } = useFairs();

  useEffect(() => {
    getRecentFairs();
  }, []);

  return (
    <>
      {!isDesktop && <SearchInput />}

      <Container>
        <SectionCarousel title="Próximas Ferias" items={renderFairs(fairs)} />
        <SectionCarousel
          title="Promociones"
          items={[<p>Uno</p>, <p>Dos</p>, <p>Tres</p>]}
        />
        <SectionCarousel
          title="Mejores Stands"
          items={[<p>Uno</p>, <p>Dos</p>, <p>Tres</p>]}
        />
      </Container>
    </>
  );
};
