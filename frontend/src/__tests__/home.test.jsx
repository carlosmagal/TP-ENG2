import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "../pages/Home";

import api from "../api";

const localStorageMock = (function () {
  var store = {};
  return {
    getItem: function (key) {
      return store[key];
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key) {
      delete store[key];
    },
  };
})();

describe("Home Page", () => {
  beforeAll(async () => {
    const email = "eeee@eee.com";
    const password = "123456";

    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });

    const response = await api
      .post("/auth/signin", { email, password })
      .catch(() => ({}));

    const { access_token } = response.data;
    localStorage.setItem("token", access_token);
  }, 20000);

  it("should create a diet with the given parameters", async () => {
    render(
      <>
        <ToastContainer />
        <HomePage />
      </>
    );

    const addDietButton = screen.getByTestId("add-diet");

    fireEvent.click(addDietButton);

    const nome = screen.getByTestId("nome");
    const dataInicio = screen.getByTestId("dataInicio");
    const dataTermino = screen.getByTestId("dataTermino");
    const cafeDaManha = screen.getByTestId("cafeDaManha");
    const almoco = screen.getByTestId("almoco");
    const janta = screen.getByTestId("janta");
    const observacoes = screen.getByTestId("observacoes");

    const formValues = {
      nome: "nome",
      dataInicio: "dataInicio",
      dataTermino: "dataTermino",
      cafeDaManha: "cafeDaManha",
      almoco: "almoco",
      janta: "janta",
    };

    fireEvent.change(nome, { target: { value: formValues.nome } });
    fireEvent.change(dataInicio, { target: { value: formValues.dataInicio } });
    fireEvent.change(dataTermino, {
      target: { value: formValues.dataTermino },
    });
    fireEvent.change(cafeDaManha, {
      target: { value: formValues.cafeDaManha },
    });
    fireEvent.change(almoco, { target: { value: formValues.almoco } });
    fireEvent.change(janta, { target: { value: formValues.janta } });
    fireEvent.change(observacoes, {
      target: { value: formValues.observacoes },
    });

    const submitData = screen.getByTestId("submit-diet");

    fireEvent.click(submitData);

    // await waitFor(() => screen.getByText("Dieta criada com sucesso!"), { timeout: 10000 }); // crime

    // const message = await screen.findByText(formValues.nome);
    // const message = await screen.findByText("Dieta criada com sucesso!");
    // expect(message).toBeInTheDocument();

    // expect(message).toBeInTheDocument();
  }, 20000);
});
