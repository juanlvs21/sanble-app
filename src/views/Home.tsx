import { useMediaQuery } from "react-responsive";

import { SearchInput } from "@/components/common/SearchInput";

export const Home: React.FC = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <div>
      {!isDesktop && <SearchInput />}
      <h1>Home</h1>
    </div>
  );
};
