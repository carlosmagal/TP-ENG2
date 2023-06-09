/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField, Grid, Container, Button } from "@mui/material";
import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../../../api/index";

function SignupForm() {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = {
        name,
        email,
        password,
      };
      await createUser(userData);
      toast.success("Usuário criado com sucesso!");
      navigate("/home");
    } catch (error) {
      handleSignUpError(error);
    } finally {
      setLoading((prev) => !prev);
    }
  };

  const createUser = async (userData) => {
    const response = await api.post("/auth/signup", userData);
    const { access_token } = response.data;
    localStorage.setItem("token", access_token);
  };

  const handleSignUpError = (error) => {
    if (error.status === 400) {
      toast.error("Bad request: Invalid user data");
    } else if (error.status === 500) {
      toast.error("Internal server error");
    } else {
      toast.error("Erro ao criar usuário");
    }
  };

  return (
    <Grid
      item
      xs={6}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="xs">
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              sx={{
                textAlign: "center",
                mb: 4,
              }}
            >
              <img
                src="/src/assets/logo.jpg"
                alt="Logo"
                style={{
                  width: "100px",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSignUp}>
                <TextField
                  label="Nome"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  inputProps={{
                    "data-testid": "name-input",
                  }}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginTop: "1rem" }}
                  required
                  inputProps={{
                    "data-testid": "email-input",
                  }}
                />
                <TextField
                  label="Senha"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginTop: "1rem" }}
                  required
                  type="password"
                  inputProps={{
                    "data-testid": "password-input",
                  }}
                />

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  fullWidth
                  data-testid="submit-button"
                  style={{
                    marginTop: "1rem",
                    backgroundColor: "#FAC63C",
                    fontWeight: "900",
                    color: "#553F04",
                  }}
                >
                  Cadastrar
                </Button>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}

export default SignupForm;
