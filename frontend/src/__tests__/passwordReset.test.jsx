import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import api from "../api";

jest.mock("../api");

function TestComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/password-reset" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

describe("Login routine", () => {
  beforeAll(() => {});

  it("should navigate user to password reset page", async () => {
    render(
      <>
        <ToastContainer />
        <TestComponent />
      </>
    );
    const passwordResetButton = screen.getByTestId("password-reset-btn");
    await userEvent.click(passwordResetButton);
    expect(window.location.pathname).toBe("/password-reset");
  }, 20000);

  it("should display success message when email is valid", async () => {
    render(
      <>
        <ToastContainer />
        <TestComponent />
      </>
    );

    const email = "eeee@eee.com"

    const emailInput = screen.getByTestId("email-input");
    const submitButton = screen.getByTestId("submit-button");
      
    fireEvent.change(emailInput, { target: { value: email }})
    fireEvent.click(submitButton)
    // await waitFor(() => {
    //   // Perform the necessary actions that trigger the text update
    // });
    
    const message = await screen.findByText("Um link para redefinição de senha foi enviado para o seu email.");

    expect(message).toBeInTheDocument();
  });
});
