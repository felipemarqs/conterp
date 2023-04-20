import { Typography, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

import FlexBetween from "../../components/FlexBetween";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);
  console.log("user", user);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <>
      <Box
        height="100vh"
        width="100wh"
        margin="0 auto"
        maxWidth="500px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <form
          onSubmit={handleSubmit}
          sx={{
            maxWidth: "500px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: "50px",
            borderRadius: "10px",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
          }}
        >
          <Typography variant="h4">Login</Typography>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            sx={{
              margin: "10px 0",
              width: "100%",
            }}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            type="password"
            label="Senha"
            variant="outlined"
            sx={{
              margin: "10px 0",
              width: "100%",
            }}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px", width: "100%" }}
          >
            Entrar
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Login;
