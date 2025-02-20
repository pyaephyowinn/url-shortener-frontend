import { Routes as ReactRouterRoutes, Route } from "react-router";
import { DashboardLayout } from "@/layouts";
import { LoginRoute, RegisterRoute } from "@/routes/auth";
import { DashboardRoute } from "@/routes/dashboard";
import { EditUrlRoute, NewUrlRoute, RedirectRoute } from "@/routes/url";

export function Routes() {
  return (
    <ReactRouterRoutes>
      <Route index element={<LoginRoute />} />
      <Route path="register" element={<RegisterRoute />} />

      <Route path="d" element={<DashboardLayout />}>
        <Route index element={<DashboardRoute />} />
        <Route path="settings" element={<div>settings</div>} />

        <Route path="new" element={<NewUrlRoute />} />
        <Route path=":id" element={<EditUrlRoute />} />
      </Route>

      <Route path=":shortUrl" element={<RedirectRoute />} />
    </ReactRouterRoutes>
  );
}
