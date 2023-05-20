import { 
    TextField, 
    Grid, 
    Container, 
    Typography, 
    Button, 
    FormControlLabel,
    Checkbox,
    Link
  } from '@mui/material';
  import React, { FormEvent } from 'react';
  
  
  
  function SignUp() {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
  
  
    const handleSignUp = (e: FormEvent) => {
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
              <form onSubmit={handleSignUp}>
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
                  Cadastrar
                </Button>
            
              </form>
              </Grid>
            </Grid>
          </Container>
        </Grid>
  
  
  
  
    </Grid>;
  }
  
  export default SignUp;
  