import { useEffect } from "react";
import { styled } from "@mui/system";
import { useMediaQuery } from "react-responsive";

import { ViewContainer } from "@/components/common/ViewContainer";
import { SearchInput } from "@/components/common/SearchInput";
import { SectionCarousel } from "@/components/common/SectionCarousel";
import { FairCard } from "@/components/fairs/Card";
import { CardSkeleton } from "@/components/fairs/CardSkeleton";
import { useFairs } from "@/hooks/useFairs";

const Container = styled("div")({
  marginTop: 20,
});

export const Home: React.FC = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const { handleGetRecentFairs, handleRefresh, fairs, loading } = useFairs();

  useEffect(() => {
    handleGetRecentFairs();
  }, []);

  return (
    <ViewContainer title="Inicio" handleRefresh={handleRefresh}>
      <>
        {!isDesktop && <SearchInput />}

        <Container>
          <SectionCarousel
            title="Próximas Ferias"
            items={fairs.map((fair) => (
              <FairCard fair={fair} />
            ))}
            renderSkeleton={() => <CardSkeleton />}
            loading={loading}
          />
          <SectionCarousel
            title="Mejores Stands"
            items={[<p>Uno</p>, <p>Dos</p>, <p>Tres</p>]}
          />
          <SectionCarousel
            title="Promociones"
            items={[<p>Uno</p>, <p>Dos</p>, <p>Tres</p>]}
          />
        </Container>
      </>
    </ViewContainer>
  );
};
