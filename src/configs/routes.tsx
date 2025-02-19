import { Routes as ReactRouterRoutes, Route } from "react-router";
import { DashboardLayout } from "@/layouts";
import { LoginRoute } from "@/routes/auth";
import { DashboardRoute } from "@/routes/dashboard";

export function Routes() {
  return (
    <ReactRouterRoutes>
      <Route index element={<LoginRoute />} />

      <Route path="d" element={<DashboardLayout />}>
        <Route path="dashboard" element={<DashboardRoute />} />
        <Route path="settings" element={<div>settings</div>} />
      </Route>
    </ReactRouterRoutes>
  );
}
