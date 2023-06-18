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

  it("should display error message when email is not valid", async () => {
    render(
      <>
        <ToastContainer />
        <TestComponent />
      </>
    );
    const errorMessage = "Erro ao solicitar redefinição de senha";
    const mockError = new Error("Password reset failed");
    api.post.mockRejectedValueOnce(mockError);

    userEvent.type(screen.getByTestId("email-input"), "test@example.com");
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/auth/reset-password", {
        email: "test@example.com",
      });
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
