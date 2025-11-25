import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CssBaseline from "@mui/material/CssBaseline";

import App from './App.tsx'
import Home from './Home.tsx';
import CustomerList from './components/CustomerList.tsx';
import TrainingList from './components/TrainingList.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true,
        element: <Home /> },
      { path: "customers",
        element: <CustomerList />, },
      { path: "trainings",
        element: <TrainingList />,  },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <CssBaseline/>
  </StrictMode>,
)
