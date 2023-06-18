import React from "react";
import {
  BrowserRouter,
  MemoryRouter,
  Router,
  Route,
  Routes,
  useNavigate,
  // useHistory,
} from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "../App";
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";

const Login = () => (
  <>
    {/* <BrowserRouter>
      <LoginPage /> */}
    <App />
    <ToastContainer />
    {/* </BrowserRouter> */}
  </>
);

function TestComponent() {
  // const history = useHistory();
  // const navigate = useNavigate();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

describe("Login routine", () => {
  beforeAll(() => {});

  it("should navigate user to home page when login is correct", async () => {
    render(
      <>
        {/*  <MemoryRouter> */}
        <ToastContainer />
        <TestComponent />
        {/* </MemoryRouter> */}
      </>
    );

    const email = "eeee@eee.com";
    const password = "123456";

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    fireEvent.click(submitButton);

    await waitFor(() => screen.getByText("Olá, Fulano!"), { timeout: 10000 }); // crime

    // const message = await screen.findByText("Olá, Fulano!");
    expect(window.location.pathname).toBe("/home");
  }, 20000);

  it("should render the error message component when login is invalid", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ToastContainer />
        <LoginPage />
      </MemoryRouter>
    );

    const email = "teste @login.com";
    const password = "123456";

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(submitButton);

    const message = await screen.findByText("Erro ao logar usuário");

    expect(message).toBeInTheDocument();
  });
});
