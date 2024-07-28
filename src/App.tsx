import { Outlet } from "react-router-dom"
import './styles/main.css'
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import Layout from './Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProtectRoute from './components/ProtectRoute'
import { GUESTS_ONLY, USERS_ONLY } from "./models/ProtectMode";
import UserCardsPage from "./pages/UserCardsPage";
import EditionsPage from "./pages/EditionsPage";
import AllCardsPage from "./pages/AllCardsPage";
import ForgotPassword from "./pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Outlet /></Layout>,
    errorElement: <Layout><ErrorPage /></Layout>,
    children: [
      {
        path: "/",
        element: <ProtectRoute mode={GUESTS_ONLY}>
          <HomePage />
        </ProtectRoute>
      },
      {
        path: "cards",
        element: <AllCardsPage />
      },
      {
        path: "editions",
        element: <EditionsPage />
      },
      {
        path: "login",
        element: <ProtectRoute mode={GUESTS_ONLY}>
          <LoginPage />
        </ProtectRoute>
      },
      {
        path: "register",
        element: <ProtectRoute mode={GUESTS_ONLY}>
          <RegisterPage />
        </ProtectRoute>
      },
      {
        path: "forgot-password",
        element: <ProtectRoute mode={GUESTS_ONLY}>
          <ForgotPassword />
        </ProtectRoute>
      },
      {
        path: "user/:username",
        element: <ProtectRoute mode={USERS_ONLY}>
          <UserCardsPage />
        </ProtectRoute>
      }
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
