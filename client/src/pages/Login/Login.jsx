import { useState } from "react";
import {
  Container,
  Card,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// TODO: Refactor to an API file later.
const AUTH_SIGNUP_API = "http://localhost:8086/enajori/api/v1/auth/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    console.log(email, password);
    if (!email || !password) {
      alert("All fields are required.");
      return;
    }

    const loginFormData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        AUTH_SIGNUP_API,
        // JSON.parse(signupFormData)
        loginFormData
      );

      console.log(response);
      const { accessToken, user, message } = response.data;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        alert(message);

        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card elevation={20} sx={{ padding: 3, mt: 20 }}>
        <Typography component="h1" textAlign="center" variant="h5">
          {" "}
          Login{" "}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Link href="/login" variant="body2">
              Don't have an account? Sign up.
            </Link>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default Login;
