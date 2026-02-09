import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "../context/DataContext";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "sonner";
import { LandingPage } from "./LandingPage";
import { AdminLayout } from "./admin/AdminLayout";
import { Dashboard } from "./admin/Dashboard";
import { DestinationsManager } from "./admin/DestinationsManager";
import { PackagesManager } from "./admin/PackagesManager";
import { LoginPage } from "./admin/LoginPage";
import { ProtectedRoute } from "./admin/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Website */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Admin Dashboard */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="destinations" element={<DestinationsManager />} />
              <Route path="packages" element={<PackagesManager />} />
            </Route>
          </Routes>
          <Toaster position="bottom-right" richColors />
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}
