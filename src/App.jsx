import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Loading from "@/components/Loading";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleRoute from "./components/auth/RoleRoute";

const LandingPage = lazy(() => import("./pages/landing"));
const LoginPage = lazy(() => import("./pages/login"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const GuruPage = lazy(() => import("./pages/admin/guru"));
const GuruDashboard = lazy(() => import("./pages/guru/dashboard"));
const MuridDashboard = lazy(() => import("./pages/murid/dashboard"));

const Unauthorized = lazy(() => import("./pages/401"));
const Error = lazy(() => import("./pages/404"));

function App() {
  return (
    <main className="App relative">
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>

            {/* ADMIN */}
            <Route element={<RoleRoute allowedRoles={["admin"]} />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin/guru" element={<GuruPage />} />
              </Route>
            </Route>

            {/* GURU */}
            <Route element={<RoleRoute allowedRoles={["guru"]} />}>
              <Route element={<Layout />}>
                <Route path="/guru/dashboard" element={<GuruDashboard />} />
              </Route>
            </Route>

            {/* MURID */}
            <Route element={<RoleRoute allowedRoles={["murid"]} />}>
              <Route element={<Layout />}>
                <Route path="/murid" element={<MuridDashboard />} />
                <Route path="/murid/dashboard" element={<MuridDashboard />} />
              </Route>
            </Route>

          </Route>

          {/* ACCESS DENIED 401 */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* 404 */}
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;