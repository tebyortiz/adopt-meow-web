import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Layout2 from "./components/Layout2";
import LandingPage from "./components/landing-page/LandingPage";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./context/authContext";
import OwnerMain from "./components/OwnerMain";
import AdopterMain from "./components/AdopterMain";
import Sidebar from "./components/Sidebar";
import { CatProvider } from "./context/CatContext";
import OwnerReports from "./components/OwnerReports";


function AppRoutes() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    );
  }

  return (
    <Layout2>
      <div className="flex flex-grow">
        <div className="flex-none w-1/5">
          <Sidebar />
        </div>
        <div className="flex-grow">
          <Routes>
            <Route path="/owner-main" element={<OwnerMain />} />
            <Route path="/adopter-main" element={<AdopterMain />} />
            <Route path="/owner-reports" element={<OwnerReports />} />
          </Routes>
        </div>
      </div>
    </Layout2>
  );
}

function App() {
  return (
    <AuthProvider>
      <CatProvider>
        <AppRoutes />
      </CatProvider>
    </AuthProvider>
  );
}

export default App;
