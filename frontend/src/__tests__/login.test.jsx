import React from "react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import api from "../api";

function TestComponent() {
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
  beforeAll(async () => {
    const email = "eeee@eee .com";
    const password = "123";

    await api.post("/auth/signin", { email, password }).catch(() => ({}));
  });

  it("should navigate user to home page when login is correct", async () => {
    render(
      <>
        <ToastContainer />
        <TestComponent />
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

    await waitFor(() => screen.getByText("Seja bem vindo!"), {
      timeout: 10000,
    }); // crime

    await screen.findByText("Seja bem vindo!");
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
