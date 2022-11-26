import { useApp } from "@/hooks/useApp";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export const FairDetails: React.FC = () => {
  const { handleShowSidebar, showSidebar } = useApp();
  useDocumentTitle("Feria");

  return (
    <div>
      <h1>Fair Details</h1>
      <button onClick={() => handleShowSidebar()}>
        {showSidebar ? "Hidden" : "Show"}
      </button>
    </div>
  );
};
