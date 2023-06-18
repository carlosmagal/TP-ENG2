import { TextField, Grid, Container, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../../../api/index";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/reset-password", { email });
      toast.success(
        "Um link para redefinição de senha foi enviado para o seu email."
      );
    } catch (error) {
      handlePasswordResetError(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordResetError = (error) => {
    let message = "Erro ao solicitar redefinição de senha";

    // Handle specific error responses if needed
    // if (error.response && error.response.data.statusCode === 404) {
    //   message = error.response.data?.message || "Usuário não encontrado";
    // }

    toast.error(message, { autoClose: 10000 });
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
      <Container maxWidth="xs">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
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
            <form onSubmit={handlePasswordReset}>
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

              <Button
                variant="contained"
                color="primary"
                type="submit"
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
                Enviar Link de Redefinição
              </Button>
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Voltar para a página de <Link to="/">login</Link>
              </Typography>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

export default PasswordReset;
