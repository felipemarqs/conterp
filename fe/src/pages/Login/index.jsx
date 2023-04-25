//MUI
import {
  Typography,
  Box,
  useMediaQuery,
  useTheme
} from "@mui/material";

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//React Router
import { useNavigate , useLocation} from "react-router-dom";

//Assets
import fundoConterp from "../../assets/fundo_conterp.png";
import sonda from '../../assets/spt60.png'
import sondaMar from '../../assets/sonda_mar.png'
import logo from '../../assets/logo.png'



//Components
import Form from "../../components/Form";

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
    <Box
      width="100%"
      height="100%"
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
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
          sx={{
            backgroundImage: `url(${pageType === 'login' ? sondaMar : sonda})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius:"1rem 1rem 0 0",
            clipPath: "polygon(0 0, 100% 0, 100% 70%, 0% 100%);"
          }}
        >
          <Box
            width="100px"
            height="100px"
            sx={{
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundImage: `url(${logo})`
            }}
          >
            
          </Box>
          <Box
          height="30px"
          width="100%"
          backgroundColor={theme.palette.primary[500]}
          >
          </Box>
        </Box>
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
