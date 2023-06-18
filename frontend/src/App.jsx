import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";

import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#588407",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <LoginPage />,
  },
  {
    path: "/password-reset",
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </MuiThemeProvider>
      <ToastContainer />
    </>
  );
}

export default App;
