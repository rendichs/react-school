import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Loading from "@/components/Loading";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const LandingPage = lazy(() => import("./pages/landing"));
const LoginPage = lazy(() => import("./pages/login"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const GuruPage = lazy(() => import("./pages/admin/guru"));
const Error = lazy(() => import("./pages/404"));

function App() {
  return (
    <main className="App relative">
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* PROTECTED */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin/guru" element={<GuruPage />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;