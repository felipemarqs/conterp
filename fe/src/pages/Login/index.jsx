//MUI
import { Typography, Box, useMediaQuery, useTheme } from "@mui/material";

import { useState } from "react";

//Components
import Form from "../../components/AuthForm";
import {
  Container,
  FormContainer,
  ImageContainer,
  LinkTypography,
  LogoContainer,
} from "./styles";

const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [pageType, setPageType] = useState("login");

  const handleChangePageType = () => {
    setPageType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <Container width="100%" height="100%" p="1rem 6%" textAlign="center">
      <FormContainer
        backgroundColor={theme.palette.secondary[500]}
        width={isNonMobileScreens ? "50%" : "93%"}
      >
        <ImageContainer pageType={pageType}>
          <LogoContainer />
          <Box
            height="30px"
            width="100%"
            backgroundColor={theme.palette.primary[500]}
          ></Box>
        </ImageContainer>

        <Typography variant="h1" fontWeight="500" color="#fff">
          {pageType === "login" ? "Login" : "Register"}
        </Typography>

        <Form formType={pageType} />
        <LinkTypography
          onClick={handleChangePageType}
          variant="h5"
          color={theme.palette.primary[600]}
          sx={{
            "&:hover": {
              color: theme.palette.primary.light,
            },
          }}
        >
          {pageType === "login"
            ? "Não tem uma conta? Crie aqui..."
            : "Já tem uma conta? Entre aqui..."}
        </LinkTypography>
      </FormContainer>
    </Container>
  );
};

export default Login;
