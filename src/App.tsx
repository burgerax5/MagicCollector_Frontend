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
import MyCardsPage from "./pages/MyCardsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Outlet /></Layout>,
    errorElement: <Layout><ErrorPage /></Layout>,
    children: [
      {
        path: "/",
        element: <HomePage />
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
        path: "mycards",
        element: <ProtectRoute mode={USERS_ONLY}>
          <MyCardsPage />
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
