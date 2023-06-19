import React from "react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "../pages/Home";
import api from "../api";
import SignupForm from "../pages/Login/components/SignupForm";

function TestComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

describe("Sign Up routine", () => {
  beforeAll(async () => {
    const email = "eeee@eee .com";
    const password = "123";

    await api.post("/auth/signin", { email, password }).catch(() => ({}));
  }, 40000);

  it("should navigate user to home page when sign up data is correct", async () => {
    render(
      <>
        <ToastContainer />
        <TestComponent />
      </>
    );

    const name = "test";
    const email = `test${(Math.random() * 1000).toFixed(4)}@test.com`;
    const password = "123456";

    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    fireEvent.click(submitButton);

    await waitFor(() => screen.getByText("Usuário criado com sucesso!"), {
      timeout: 10000,
    }); // crime

    // await screen.findByText("Seja bem vindo!");
    expect(window.location.pathname).toBe("/home");
  }, 20000);

  it("should render the error message component when sign up data is invalid", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ToastContainer />
        <SignupForm />
      </MemoryRouter>
    );

    const name = "name";
    const email = "emailerrado";
    const password = "123456";

    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    fireEvent.click(submitButton);

    const message = await screen.findByText("Erro ao criar usuário");

    expect(message).toBeInTheDocument();
  });
});
