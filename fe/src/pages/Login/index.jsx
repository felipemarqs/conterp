import {
  Typography,
  TextField,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import fundoConterp from "./fundo_conterp.png";
import sondaMar from './sonda_mar.png'

import UsersServices from "../../services/UsersServices";

import { setMode } from "../../state";
import FlexBetween from "../../components/FlexBetween";
import { useTheme } from "@mui/material";

import Form from "../../components/Form";

const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [pageType, setPageType] = useState("login");

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);

  const handleChangePageType = () => {
    setPageType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  const loadUsers = useCallback(async () => {
    try {
      const users = await UsersServices.listUsers();
      console.log("users", users);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Box
      width="100%"
      height="100%"
      /*  backgroundColor={theme.palette.background.alt} */
      p="1rem 6%"
      textAlign="center"
    >
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        height="90%"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.secondary[500]}
      >
        <Box
        width="100%"
        height="40%"
          sx={{
            backgroundImage: `url(${sondaMar})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius:"1rem 1rem 0 0",
            clipPath: "polygon(0 0, 100% 0, 100% 70%, 0% 100%);"
          }}
        ></Box>
        {pageType === "register" ? (
          <>
            <Typography variant="h1" fontWeight="500" color="#fff">
              Register Page
            </Typography>

            <Typography
              onClick={handleChangePageType}
              variant="h5"
              color={theme.palette.primary[600]}
              fontSize="14px"
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
                "&:hover": {
                  color: theme.palette.primary.light,
                },
              }}
            >
              Já tem uma conta? Entre aqui....
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h1" fontWeight="500" color="#fff">
              Login Page
            </Typography>

            <Typography
              onClick={handleChangePageType}
              variant="h5"
              color={theme.palette.primary[600]}
              fontSize="14px"
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
                "&:hover": {
                  color: theme.palette.primary.light,
                },
              }}
            >
              Não tem uma conta? Crie aqui....
            </Typography>
          </>
        )}

        <Form formType={pageType} />
      </Box>
    </Box>
  );
};

export default Login;
