import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Shifts from "./pages/Shifts";
import Drivers from "./pages/Drivers";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Maps from "./pages/Maps";
import Planning from "./pages/Planning";
import AddDriver from "./pages/AddDriver";
import DriverProfile from "./pages/DriverProfile";
import ForgetPassword from "./pages/ForgetPassword";
import HistoryShifts from "./pages/HistoryShifts";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";
import Unauthorized from "./pages/Unauthorized";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/history-shifts" element={<HistoryShifts />} />
              <Route path="/shifts" element={<Shifts />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/drivers/add" element={<AddDriver />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/drivers/:id" element={<DriverProfile />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/map" element={<Maps />} />
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
