import { 
  TextField, 
  Grid, 
  Container, 
  Typography, 
  Button, 
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';




function LoginPage() {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [rememberMe, setRememberMe] = React.useState<boolean>(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
  }

  return <Grid container>

      <Grid item xs={6}>
        <img 
          src="src/assets/background.jpg"
          alt="Background"
          style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
        />
      </Grid>

      <Grid 
        item 
        xs={6} 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
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
                textAlign: 'center', 
                mb: 4 
              }}>
                <img 
                src="/src/assets/logo.jpg" 
                alt="Logo" 
                style={{ 
                  width: '100px' 
                }} />  
            </Grid>
            <Grid 
              item 
              xs={12}
            >
            <form onSubmit={handleLogin}>
              <TextField 
                label="Email" 
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                />
              <TextField 
                label="Senha" 
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                style={{ marginTop: '1rem' }}
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
                fullWidth 
                style={{ 
                  marginTop: '1rem', 
                  backgroundColor: '#FAC63C', 
                  fontWeight: "900", 
                  color: "#553F04" 
                }}>
                Entrar
              </Button>
              <Typography 
                variant="body2" 
                align="center" 
                sx={{ mt: 2 }}
              >
              Esqueceu a Senha? <Link to="/password-reset">Clique aqui</Link>
              </Typography>

              <Typography variant="body2" align="center" sx={{ mt: 4 }}>
                Caso ainda não tenha uma conta
              </Typography>
              <Link to="/signup">
                <Button variant="outlined" fullWidth style={{ marginTop: '0.5rem', backgroundColor: "#588407", fontWeight: "900", color: "#1D2D00"}}>
                      Cadastre-se
                    
                </Button>
              </Link>
            </form>
            </Grid>
          </Grid>
        </Container>
      </Grid>




  </Grid>;
}

export default LoginPage;
