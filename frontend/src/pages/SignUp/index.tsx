/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField, Grid, Container, Button } from "@mui/material";
import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../api/index";

function SignUp() {
  const [email, setEmail] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const obj = {
      name,
      email,
      password,
    };

    try {
      const response: any = await api.post("/auth/signup", obj);

      localStorage.setItem("token", response?.data?.access_token);

      toast.success("Usuário criado com sucesso!");
      navigate("/home");
    } catch (error) {
      toast.error("Erro ao criar usuário");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
              <form onSubmit={handleSignUp}>
                <TextField
                  label="Nome"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginTop: "1rem" }}
                  required
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
                />

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  fullWidth
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

export default SignUp;
