import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import Layout from './Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><App /></Layout>,
    errorElement: <Layout><ErrorPage /></Layout>,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "login",
        element: <h1>LOGIN</h1>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
