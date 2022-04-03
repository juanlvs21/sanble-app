import { MainLayout } from "@/layouts/Main";
import { TabBar } from "@/components/common/TabBar";

export const StandsListScreen: React.FC = () => (
  <MainLayout title="Stands">
    <h1>Lista de Stands</h1>
    <TabBar />
  </MainLayout>
);

export default StandsListScreen;
