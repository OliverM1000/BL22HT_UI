import { createBrowserRouter } from "react-router-dom";
import RegisterUserForm from "../forms/RegisterUserForm";
import LoginUserForm from "../forms/LoginUserForm";
import MainPage from "./MainPage";
import AccountPage from "./AccountPage";
import SamplesPage from "./SamplesPage";
import CreatePage from "./CreatePage";
import DataPage from "./DataPage";
import HomePage from "./HomePage";

const router = createBrowserRouter([
  { path: "/", element: <LoginUserForm /> },
  { path: "/register", element: <RegisterUserForm /> },
  {
    path: "/main",
    element: <MainPage />,
    children: [
      { path: "create", element: <CreatePage /> },
      { path: "samples", element: <SamplesPage /> },
      { path: "data", element: <DataPage /> },
      { path: "account", element: <AccountPage /> },
    ],
  },
]);

export default router;
