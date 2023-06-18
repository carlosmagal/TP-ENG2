/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../api/index";

function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/signin", { email, password });
      saveToken(response.data);
      navigate("/home");
    } catch (error) {
      handleLoginError(error);
    } finally {
      setLoading((prev) => !prev);
    }
  };

  const saveToken = (data) => {
    const { access_token, expires_in } = data;
    const currentTime = new Date().getTime();
    const expirationTime = currentTime + expires_in * 1000;
    localStorage.setItem("token", access_token);
    localStorage.setItem("tokenExpiration", expirationTime);
  };

  const handleLoginError = (error) => {
    let message = "Erro ao logar usuário";

    // if (error.response && error.response.data.statusCode === 401) {
    //   message = error.response.data?.message || "Credenciais inválidas";
    // }
    toast.error(message, { autoClose: 10000 });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <Grid container>
      <Grid item xs={6}>
        <img
          src="src/assets/background.jpg"
          alt="Background"
          style={{ width: "100%", height: "100vh", objectFit: "cover" }}
        />
      </Grid>

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
              <form onSubmit={handleLogin}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  inputProps={{
                    "data-testid": "password-input",
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberMe"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      color="primary"
                    />
                  }
                  label="Lembrar meus dados"
                />

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  role="button"
                  fullWidth
                  style={{
                    marginTop: "1rem",
                    backgroundColor: "#FAC63C",
                    fontWeight: "900",
                    color: "#553F04",
                  }}
                  disabled={loading}
                  data-testid="submit-button"
                >
                  Entrar
                </Button>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  Esqueceu a Senha?{" "}
                  <Link to="/password-reset">Clique aqui</Link>
                </Typography>

                <Typography variant="body2" align="center" sx={{ mt: 4 }}>
                  Caso ainda não tenha uma conta
                </Typography>
                <Link to="/signup">
                  <Button
                    variant="outlined"
                    fullWidth
                    style={{
                      marginTop: "0.5rem",
                      backgroundColor: "#588407",
                      fontWeight: "900",
                      color: "#1D2D00",
                    }}
                  >
                    Cadastre-se
                  </Button>
                </Link>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
