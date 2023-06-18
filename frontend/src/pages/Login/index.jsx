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

import LoginForm from "./components/LoginForm";
import PasswordReset from "./components/PasswordReset";
import SignupForm from "./components/SignupForm";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../api/index";

function LoginPage() {
  const formComponent = () => {
    const { pathname } = location;

    switch (pathname) {
      case "/password-reset":
        return <PasswordReset />;
      case "/signup":
        return <SignupForm />;
      default:
        return <LoginForm />;
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

      {formComponent()}
    </Grid>
  );
}

export default LoginPage;
