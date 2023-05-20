import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import SignUp from "./pages/SignUp";

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
    element: <SignUp />,
  },
]);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </MuiThemeProvider>
  );
}

export default App;
