import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "../context/DataContext";
import { Toaster } from "sonner";
import { LandingPage } from "./LandingPage";
import { AdminLayout } from "./admin/AdminLayout";
import { Dashboard } from "./admin/Dashboard";
import { DestinationsManager } from "./admin/DestinationsManager";
import { PackagesManager } from "./admin/PackagesManager";

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="destinations" element={<DestinationsManager />} />
            <Route path="packages" element={<PackagesManager />} />
          </Route>
        </Routes>
        <Toaster position="bottom-right" richColors />
      </BrowserRouter>
    </DataProvider>
  );
}
