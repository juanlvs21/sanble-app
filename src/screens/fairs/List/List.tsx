import { MainLayout } from "@/layouts/Main";
import { TabBar } from "@/components/common/TabBar";

export const FairsListScreen: React.FC = () => (
  <MainLayout title="Ferias">
    <h1>Lista de Ferias</h1>
    <TabBar />
  </MainLayout>
);

export default FairsListScreen;
