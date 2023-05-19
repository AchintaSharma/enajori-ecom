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
const AUTH_SIGNUP_API = "http://localhost:8086/enajori/api/v1/auth/signup";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // console.log(userName, email, phone, password, confirmPassword);
    if (!userName || !email || !phone || !password) {
      alert("All fields are required.");
      return;
    }
    if (password.length < 8) {
      alert("Password should be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const signupFormData = {
      userName: userName,
      email: email,
      phone: phone,
      password: password,
    };

    try {
      const response = await axios.post(
        AUTH_SIGNUP_API,
        // JSON.parse(signupFormData)
        signupFormData
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
      <Card
        elevation={20}
        sx={{
          padding: 3,
          mt: 5,
        }}
      >
        <Typography component="h1" textAlign="center" variant="h5">
          {" "}
          Sign up{" "}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              name="userName"
              autoComplete="username"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          </Grid>
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
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
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
              Sign Up
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

export default SignUp;
