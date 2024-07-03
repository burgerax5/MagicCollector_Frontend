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
import UsersOnly from './components/UsersOnly'

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
        element: <LoginPage />
      },
      {
        path: "register",
        element: <RegisterPage />
      },
      {
        path: "mycards",
        element: <UsersOnly><h1>HI</h1></UsersOnly>
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
