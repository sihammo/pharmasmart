import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/landing";
import { LoginPage } from "./pages/login";
import { SignupPage } from "./pages/signup";
import { DashboardLayout } from "./layouts/dashboard-layout";
import { HomePage } from "./pages/home";
import { PharmaciesPage } from "./pages/pharmacies";
import { MedicinesPage } from "./pages/medicines";
import { HealthPacksPage } from "./pages/health-packs";
import { OrdersPage } from "./pages/orders";
import { ProfilePage } from "./pages/profile";
import { AccountPage } from "./pages/account";
import { AdminLayout } from "./layouts/admin-layout";
import { AdminDashboard } from "./pages/admin/dashboard";
import { AdminUsers } from "./pages/admin/users";
import { AdminOrders } from "./pages/admin/orders";
import { AdminMedicines } from "./pages/admin/medicines";
import { AdminPharmacies } from "./pages/admin/pharmacies";
import { NotFound } from "./pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "pharmacies", Component: PharmaciesPage },
      { path: "medicines", Component: MedicinesPage },
      { path: "health-packs", Component: HealthPacksPage },
      { path: "orders", Component: OrdersPage },
      { path: "profile", Component: ProfilePage },
      { path: "account", Component: AccountPage },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "users", Component: AdminUsers },
      { path: "orders", Component: AdminOrders },
      { path: "medicines", Component: MedicinesPage },
      { path: "pharmacies", Component: PharmaciesPage },
      { path: "analytics", Component: AdminDashboard },
      { path: "settings", Component: ProfilePage },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);