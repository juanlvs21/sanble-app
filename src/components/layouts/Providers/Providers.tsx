import { Outlet } from "react-router-dom";

import { AppProvider } from "@/context";
import { DataProvider } from "@/providers/DataProvider";

export const ProvidersLayout = () => (
  <AppProvider>
    <DataProvider>
      <Outlet />
    </DataProvider>
  </AppProvider>
);
